export interface ParsedRequest {
  method: string;
  url: string;
  headers: Record<string, string>; // always lowercase keys
  query: Record<string, string>;
  body: any;                       // parsed (JSON / form) or string, null if empty
  rawBody: string | null;          // exact text, needed for webhook signature checks
}

type AnyObj = Record<string, any>;

// ---------------------------------------------------------------------------
// Helpers (no Node-only globals: no Buffer, no `instanceof Request`)
// ---------------------------------------------------------------------------

// Duck-typing works across realms/polyfills (Deno, undici, Workers, Azure v4...)
function isFetchRequest(x: any): boolean {
  return (
    !!x &&
    typeof x.clone === "function" &&
    typeof x.text === "function" &&
    typeof x.url === "string" &&
    typeof x.headers?.get === "function"
  );
}

function normalizeHeaders(input: any): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input) return out;

  // Headers / Map-like (Fetch, Azure v4)
  if (typeof input.forEach === "function" && typeof input.get === "function") {
    input.forEach((v: string, k: string) => {
      out[String(k).toLowerCase()] = String(v);
    });
    return out;
  }

  // Plain objects (Lambda, Node, Express). Node can give string[] values.
  for (const [k, v] of Object.entries(input)) {
    if (v == null) continue;
    out[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : String(v);
  }
  return out;
}

function normalizeQuery(input: any): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input) return out;

  const add = (k: string, v: any) => {
    if (v == null) return;
    out[k] = k in out ? `${out[k]},${v}` : String(v); // repeated keys -> "a,b"
  };

  if (typeof input.forEach === "function") {
    input.forEach((v: string, k: string) => add(k, v)); // URLSearchParams
  } else {
    for (const [k, v] of Object.entries(input)) {
      add(k, Array.isArray(v) ? v.join(",") : v);
    }
  }
  return out;
}

function queryFromUrl(url: string): Record<string, string> {
  const i = url.indexOf("?");
  return i === -1 ? {} : normalizeQuery(new URLSearchParams(url.slice(i + 1)));
}

function base64ToText(b64: string): string {
  // atob exists in Node 16+, Deno, Bun, Workers, browsers
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function bytesToText(b: ArrayBuffer | ArrayBufferView): string {
  return new TextDecoder().decode(b as any);
}

async function readStream(stream: any): Promise<string> {
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];
  for await (const c of stream) {
    chunks.push(typeof c === "string" ? enc.encode(c) : c);
  }
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const all = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    all.set(c, off);
    off += c.length;
  }
  return new TextDecoder().decode(all);
}

function parseText(text: string, contentType: string): any {
  const ct = contentType.toLowerCase();

  if (ct.includes("json")) {
    try { return JSON.parse(text); } catch { return text; }
  }
  if (ct.includes("application/x-www-form-urlencoded")) {
    return normalizeQuery(new URLSearchParams(text));
  }
  // No content-type (some proxies strip it): sniff for JSON
  if (!ct) {
    const t = text.trimStart();
    if (t.startsWith("{") || t.startsWith("[")) {
      try { return JSON.parse(text); } catch { /* fall through */ }
    }
  }
  return text;
}

/** Turns whatever a runtime hands us as "body" into { body, rawBody }. */
function finalizeBody(
  raw: unknown,
  contentType: string,
  isBase64 = false
): { body: any; rawBody: string | null } {
  if (raw == null || raw === "") return { body: null, rawBody: null };

  let text: string;
  if (typeof raw === "string") {
    text = isBase64 ? base64ToText(raw) : raw;
  } else if (raw instanceof ArrayBuffer || ArrayBuffer.isView(raw)) {
    text = bytesToText(raw as any); // includes Node Buffer
  } else {
    // Already parsed by the framework (Express json(), Azure v3, GCF)
    return { body: raw, rawBody: null };
  }

  return { body: parseText(text, contentType), rawBody: text };
}

const NO_BODY_METHODS = new Set(["GET", "HEAD"]);

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export async function parseAnyPayload(rawInput: any): Promise<ParsedRequest> {
  if (!rawInput) {
    throw new Error("[YourSDK] No request object/event provided.");
  }

  // Unwrap handler "context" wrappers:
  //  - Cloudflare Pages Functions / SvelteKit / Remix: { request }
  //  - Azure Functions v3: context.req
  let input: AnyObj = rawInput;
  if (!isFetchRequest(input) && isFetchRequest(input.request)) {
    input = input.request;
  } else if (input.req && input.req.headers && !input.headers) {
    input = input.req;
  }

  // -------------------------------------------------------------------------
  // 1. Fetch-style Request
  // Cloudflare Workers, Deno, Bun, Supabase Edge, Vercel Edge, Netlify v2,
  // Next.js route handlers, Azure Functions v4
  // -------------------------------------------------------------------------
  if (isFetchRequest(input)) {
    const clone = input.clone(); // leave the original body readable for the caller
    const method = String(clone.method || "GET").toUpperCase();
    const headers = normalizeHeaders(clone.headers);

    let text: string | null = null;
    if (!NO_BODY_METHODS.has(method)) {
      try { text = await clone.text(); } catch { text = null; }
    }
    const { body, rawBody } = finalizeBody(text, headers["content-type"] || "");

    return {
      method,
      url: clone.url,
      headers,
      query: normalizeQuery(new URL(clone.url).searchParams),
      body,
      rawBody,
    };
  }

  // -------------------------------------------------------------------------
  // 2. AWS Lambda-style events
  // API Gateway REST v1 / HTTP v2, Function URLs, ALB, Netlify v1 functions
  // -------------------------------------------------------------------------
  if (input.requestContext || input.httpMethod || input.rawPath) {
    const headers = normalizeHeaders(input.headers);
    const method = String(
      input.requestContext?.http?.method || input.httpMethod || "POST"
    ).toUpperCase();

    const path = input.rawPath || input.path || "/";
    const qs = input.rawQueryString ? `?${input.rawQueryString}` : "";
    const proto = headers["x-forwarded-proto"] || "https";
    const host = headers["host"] || "lambda.local";
    const url = input.rawUrl || `${proto}://${host}${path}${qs}`;

    const query =
      input.queryStringParameters && Object.keys(input.queryStringParameters).length
        ? normalizeQuery(input.queryStringParameters)
        : input.rawQueryString
          ? queryFromUrl(`?${input.rawQueryString}`)
          : {};

    const { body, rawBody } = finalizeBody(
      input.body,
      headers["content-type"] || "",
      !!input.isBase64Encoded
    );

    return { method, url, headers, query, body, rawBody };
  }

  // -------------------------------------------------------------------------
  // 3. Node-style req
  // Express, Vercel Node, Google Cloud Functions, Azure Functions v3,
  // raw http.IncomingMessage
  // -------------------------------------------------------------------------
  if (input.headers && input.method) {
    const headers = normalizeHeaders(input.headers);
    const method = String(input.method).toUpperCase();

    const path: string = input.originalUrl || input.url || "/";
    let url = path;
    if (!/^https?:\/\//i.test(path)) {
      const proto =
        headers?.["x-forwarded-proto"]?.split(",")?.[0]?.trim() ||
        input.protocol ||
        (input.socket?.encrypted ? "https" : "http");
      const host = headers["x-forwarded-host"] || headers["host"] || "localhost";
      url = `${proto}://${host}${path}`;
    }

    const hasQueryObj = input.query && Object.keys(input.query).length > 0;
    const query = hasQueryObj ? normalizeQuery(input.query) : queryFromUrl(url);

    // Prefer pre-parsed body, then rawBody (GCF/Azure), then read the stream.
    let rawBody: unknown = input.body !== undefined ? input.body : input.rawBody;
    if (
      rawBody === undefined &&
      !NO_BODY_METHODS.has(method) &&
      typeof (input as any)[Symbol.asyncIterator] === "function"
    ) {
      rawBody = await readStream(input);
    }

    const out = finalizeBody(rawBody, headers["content-type"] || "");

    // If framework gave us an object but a raw buffer exists, expose the raw text too
    if (out.rawBody === null && input.rawBody != null) {
      out.rawBody =
        typeof input.rawBody === "string" ? input.rawBody : bytesToText(input.rawBody);
    }

    return { method, url, headers, query, body: out.body, rawBody: out.rawBody };
  }

  throw new Error("[YourSDK] Could not identify runtime payload type.");
}