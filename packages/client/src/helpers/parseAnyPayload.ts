import { decode as msgpackDecode } from "@msgpack/msgpack";

export interface ParsedRequest {
    method: string;
    url: string;
    headers: Record<string, string>;
    query: Record<string, string>;
    /** Decoded body: object (json/msgpack/form), string (text), Uint8Array (binary), or null */
    body: any;
    /** Raw body as text. Always null for msgpack/binary payloads. */
    rawBody: string | null;
}

type AnyObj = Record<string, any>;
type BodyKind = "msgpack" | "binary" | "text";

const NO_BODY_METHODS = new Set(["GET", "HEAD"]);

// ---------------------------------------------------------------------------
// 1. Byte & Buffer Utilities
// ---------------------------------------------------------------------------
const Bytes = {
    isArrayBufferLike(x: unknown): x is ArrayBuffer {
        const tag = Object.prototype.toString.call(x);
        return tag === "[object ArrayBuffer]" || tag === "[object SharedArrayBuffer]";
    },

    isBufferJson(x: any): x is { type: "Buffer"; data: number[] } {
        return !!x && x.type === "Buffer" && Array.isArray(x.data);
    },

    isBytesLike(x: unknown): boolean {
        return ArrayBuffer.isView(x) || Bytes.isArrayBufferLike(x) || Bytes.isBufferJson(x);
    },

    base64ToBytes(b64: string): Uint8Array {
        const bin = atob(b64.replace(/\s/g, ""));
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out;
    },

    latin1ToBytes(text: string): Uint8Array {
        const out = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) {
            out[i] = text.charCodeAt(i) & 0xff;
        }
        return out;
    },

    toBytes(raw: unknown, isBase64 = false, isBinaryContentType = false): Uint8Array {
        if (typeof raw === "string") {
            if (isBase64) return Bytes.base64ToBytes(raw);
            if (isBinaryContentType) return Bytes.latin1ToBytes(raw);
            return new TextEncoder().encode(raw);
        }
        if (ArrayBuffer.isView(raw)) {
            return new Uint8Array(raw.buffer as ArrayBuffer, raw.byteOffset, raw.byteLength);
        }
        if (Bytes.isArrayBufferLike(raw)) return new Uint8Array(raw);
        if (Bytes.isBufferJson(raw)) return Uint8Array.from(raw.data);
        return new TextEncoder().encode(String(raw));
    },

    bytesToText(bytes: Uint8Array): string {
        return new TextDecoder().decode(bytes);
    },

    async readStreamBytes(stream: any): Promise<Uint8Array> {
        const enc = new TextEncoder();
        const chunks: Uint8Array[] = [];
        for await (const c of stream) {
            chunks.push(typeof c === "string" ? enc.encode(c) : Bytes.toBytes(c));
        }
        const total = chunks.reduce((n, c) => n + c.length, 0);
        const all = new Uint8Array(total);
        let off = 0;
        for (const c of chunks) {
            all.set(c, off);
            off += c.length;
        }
        return all;
    },

    isEmptyPlainObject(x: unknown): boolean {
        return (
            !!x &&
            typeof x === "object" &&
            !Bytes.isBytesLike(x) &&
            !Array.isArray(x) &&
            Object.keys(x as object).length === 0
        );
    }
};

// ---------------------------------------------------------------------------
// 2. Header & Query Utilities
// ---------------------------------------------------------------------------
const HeadersQuery = {
    normalizeHeaders(input: any): Record<string, string> {
        const out: Record<string, string> = {};
        if (!input) return out;

        if (typeof input.forEach === "function" && typeof input.get === "function") {
            input.forEach((v: string, k: string) => {
                out[String(k).toLowerCase()] = String(v);
            });
            return out;
        }

        for (const [k, v] of Object.entries(input)) {
            if (v == null) continue;
            out[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : String(v);
        }
        return out;
    },

    normalizeQuery(input: any): Record<string, string> {
        const out: Record<string, string> = {};
        if (!input) return out;

        const add = (k: string, v: any) => {
            if (v == null) return;
            const s = typeof v === "object" ? JSON.stringify(v) : String(v);
            out[k] = k in out ? `${out[k]},${s}` : s;
        };

        if (typeof input.forEach === "function") {
            input.forEach((v: any, k: string) => add(k, v));
        } else {
            for (const [k, v] of Object.entries(input)) {
                add(k, Array.isArray(v) ? v.join(",") : v);
            }
        }
        return out;
    },

    queryFromUrl(url: string): Record<string, string> {
        const i = url.indexOf("?");
        if (i === -1) return {};
        const hash = url.indexOf("#", i);
        return HeadersQuery.normalizeQuery(new URLSearchParams(url.slice(i + 1, hash === -1 ? undefined : hash)));
    },

    decodeUrlEncodedMap(input: AnyObj): AnyObj {
        const dec = (s: string) => {
            try { return decodeURIComponent(s.replace(/\+/g, " ")); } catch { return s; }
        };
        const out: AnyObj = {};
        for (const [k, v] of Object.entries(input)) {
            out[dec(k)] = Array.isArray(v) ? v.map((x) => dec(String(x))) : v == null ? v : dec(String(v));
        }
        return out;
    }
};

// ---------------------------------------------------------------------------
// 3. Body & Content-Type Decoders
// ---------------------------------------------------------------------------
const BodyDecoder = {
    bodyKind(contentType: string): BodyKind {
        const ct = contentType.toLowerCase();
        if (ct.includes("msgpack")) return "msgpack";
        if (/^\s*(image|audio|video)\//.test(ct) || /application\/(octet-stream|pdf|zip|gzip)/.test(ct)) {
            return "binary";
        }
        return "text";
    },

    parseTextBody(text: string, contentType: string): any {
        const ct = contentType.toLowerCase();
        if (ct.includes("json")) {
            try { return JSON.parse(text); } catch { return text; }
        }
        if (ct.includes("application/x-www-form-urlencoded")) {
            return HeadersQuery.normalizeQuery(new URLSearchParams(text));
        }
        if (!ct.trim()) {
            const t = text.trimStart();
            if (t.startsWith("{") || t.startsWith("[")) {
                try { return JSON.parse(text); } catch { /* ignore */ }
            }
        }
        return text;
    },

    decodeBytes(bytes: Uint8Array, contentType: string): { body: any; rawBody: string | null } {
        const kind = BodyDecoder.bodyKind(contentType);

        if (kind === "msgpack") {
            try {
                return { body: msgpackDecode(bytes), rawBody: null };
            } catch (cause) {
                throw new Error(
                    `[parseAnyPayload] Invalid MessagePack payload (${bytes.byteLength} bytes): ${
                        cause instanceof Error ? cause.message : String(cause)
                    }`,
                    { cause }
                );
            }
        }

        if (kind === "binary") return { body: bytes, rawBody: null };

        const text = Bytes.bytesToText(bytes);
        return { body: BodyDecoder.parseTextBody(text, contentType), rawBody: text };
    },

    finalizeBody(raw: unknown, contentType: string, isBase64 = false): { body: any; rawBody: string | null } {
        if (raw == null || raw === "") return { body: null, rawBody: null };

        if (typeof raw !== "string" && !Bytes.isBytesLike(raw)) {
            return { body: raw, rawBody: null };
        }

        const kind = BodyDecoder.bodyKind(contentType);
        const isBinaryContentType = kind === "msgpack" || kind === "binary";

        const bytes = Bytes.toBytes(raw, isBase64, isBinaryContentType);
        if (bytes.byteLength === 0) return { body: null, rawBody: null };

        return BodyDecoder.decodeBytes(bytes, contentType);
    }
};

// ---------------------------------------------------------------------------
// 4. Runtime Detection Helpers
// ---------------------------------------------------------------------------
const Runtime = {
    isFetchRequest(x: any): boolean {
        return (
            !!x &&
            typeof x.clone === "function" &&
            typeof x.url === "string" &&
            typeof x.headers?.get === "function" &&
            (typeof x.arrayBuffer === "function" || typeof x.text === "function")
        );
    },

    unwrapInput(rawInput: any): any {
        let input: AnyObj = rawInput;
        if (!Runtime.isFetchRequest(input) && Runtime.isFetchRequest(input.request)) {
            input = input.request;
        } else if (!Runtime.isFetchRequest(input) && Runtime.isFetchRequest(input.req?.raw)) {
            input = input.req.raw;
        } else if (input.req && input.req.headers && !input.headers) {
            input = input.req;
        }
        return input;
    }
};

// ---------------------------------------------------------------------------
// Main Entry Point
// ---------------------------------------------------------------------------
export async function parseAnyPayload(rawInput: any): Promise<ParsedRequest> {
    if (!rawInput) {
        throw new Error("[parseAnyPayload] No request object/event provided.");
    }

    const input = Runtime.unwrapInput(rawInput);

    // 1. Fetch-style Request
    if (Runtime.isFetchRequest(input)) {
        let req: AnyObj;
        try { req = input.clone(); } catch { req = input; }

        const method = String(req.method || "GET").toUpperCase();
        const headers = HeadersQuery.normalizeHeaders(req.headers);
        const contentType = headers["content-type"] || "";

        let bytes: Uint8Array | null = null;
        if (!NO_BODY_METHODS.has(method)) {
            try {
                bytes = typeof req.arrayBuffer === "function"
                    ? new Uint8Array(await req.arrayBuffer())
                    : new TextEncoder().encode(await req.text());
            } catch {
                bytes = null;
            }
        }

        const { body, rawBody } = BodyDecoder.finalizeBody(bytes, contentType);
        return { method, url: req.url, headers, query: HeadersQuery.queryFromUrl(req.url), body, rawBody };
    }

    // 2. AWS Lambda-style Events
    if (input.requestContext || input.httpMethod || input.rawPath) {
        const headers = HeadersQuery.normalizeHeaders(input.multiValueHeaders ?? input.headers);
        const method = String(input.requestContext?.http?.method || input.httpMethod || "POST").toUpperCase();
        const isAlb = !!input.requestContext?.elb;

        let query: Record<string, string> = {};
        if (input.rawQueryString) {
            query = HeadersQuery.queryFromUrl(`?${input.rawQueryString}`);
        } else {
            let src = input.multiValueQueryStringParameters ?? input.queryStringParameters;
            if (src && isAlb) src = HeadersQuery.decodeUrlEncodedMap(src);
            query = HeadersQuery.normalizeQuery(src);
        }

        const path = input.rawPath || input.path || "/";
        const qs = input.rawQueryString
            ? `?${input.rawQueryString}`
            : Object.keys(query).length
            ? `?${new URLSearchParams(query).toString()}`
            : "";
        const proto = headers["x-forwarded-proto"]?.split(",")[0]?.trim() || "https";
        const host = headers["host"] || input.requestContext?.domainName || "lambda.local";
        const url = input.rawUrl || `${proto}://${host}${path}${qs}`;

        const { body, rawBody } = BodyDecoder.finalizeBody(
            input.body,
            headers["content-type"] || "",
            !!input.isBase64Encoded
        );

        return { method, url, headers, query, body, rawBody };
    }

    // 3. Node-style req (Express, Fastify, GCF, etc.)
    if (input.headers && input.method) {
        const headers = HeadersQuery.normalizeHeaders(input.headers);
        const method = String(input.method).toUpperCase();
        const contentType = headers["content-type"] || "";

        const path: string = input.originalUrl || input.url || "/";
        let url = path;
        if (!/^https?:\/\//i.test(path)) {
            const proto =
                headers["x-forwarded-proto"]?.split(",")[0]?.trim() ||
                input.protocol ||
                (input.socket?.encrypted ? "https" : "http");
            const host = headers["x-forwarded-host"] || headers["host"] || "localhost";
            url = `${proto}://${host}${path}`;
        }

        const hasQueryObj = input.query && Object.keys(input.query).length > 0;
        const query = hasQueryObj ? HeadersQuery.normalizeQuery(input.query) : HeadersQuery.queryFromUrl(url);

        let raw: unknown = input.body !== undefined ? input.body : input.rawBody;

        if (Bytes.isEmptyPlainObject(raw) && !contentType.toLowerCase().includes("json")) {
            raw = input.rawBody;
        }

        if (raw === undefined && !NO_BODY_METHODS.has(method) && typeof input[Symbol.asyncIterator] === "function") {
            try { raw = await Bytes.readStreamBytes(input); } catch { raw = undefined; }
        }

        const out = BodyDecoder.finalizeBody(raw, contentType);

        if (out.rawBody === null && input.rawBody != null && BodyDecoder.bodyKind(contentType) === "text") {
            out.rawBody = typeof input.rawBody === "string" ? input.rawBody : Bytes.bytesToText(Bytes.toBytes(input.rawBody));
        }

        return { method, url, headers, query, body: out.body, rawBody: out.rawBody };
    }

    throw new Error("[parseAnyPayload] Could not identify runtime payload type.");
}