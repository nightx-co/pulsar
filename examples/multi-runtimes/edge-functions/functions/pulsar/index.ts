import { requestHandler } from "./setup.ts";

Deno.serve(async (req : Request) => {
    const { message, status } = await requestHandler.handle(req);

    return new Response(JSON.stringify({ message }), { headers : { 'Content-Type' : "application/json" }, status })
})