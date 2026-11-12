import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

declare const EdgeRuntime: {
    userWorkers: {
        create: (opts: {
            servicePath: string;
            memoryLimitMb?: number,
            cpuTimeSoftLimitMs? : number,
            cpuTimeHardLimitMs? : number,
            workerTimeoutMs? : number,
            importMapPath? : string
        }) => Promise<{
            fetch: (req: Request) => Promise<Response>;
        }>
    }
}


serve(async (req: Request) => {
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const functionName = pathParts[0];

    if (!functionName) {
        return new Response(
            JSON.stringify({ error: "No function name specified in path." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        )
    }

    if (functionName === "main") {
        return new Response(
            JSON.stringify({ error: "Cannot invoke main directly." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        )
    }

    try {

        const servicePath = `/home/deno/functions/${functionName}`;
        const worker = await EdgeRuntime.userWorkers.create({
            servicePath,
            memoryLimitMb : 128,
            cpuTimeHardLimitMs : 2000, // 2000 DEFAUT,
            cpuTimeSoftLimitMs : 2000,// 2000 DEFAUT,
            importMapPath: '/home/deno/functions/import_map.json',
            //workerTimeoutMs : 200_000,
        });

        // Try executing the request with the cached worker
        try {
            return await worker.fetch(req);
        }
        catch (fetchErr) {
            throw fetchErr;
        }
    }
    catch (error) {
        return new Response(
            JSON.stringify({
                error: `Failed to dispatch to function '${functionName}'.`,
                details: String(error),
            }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        )
    }
})