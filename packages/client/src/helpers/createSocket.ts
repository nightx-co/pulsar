export async function createSocket(url : string) : Promise<WebSocket> {
    if (typeof (globalThis as any).Bun !== "undefined" || typeof (globalThis as any).Deno !== "undefined") {
        const crosswsModule = await import("crossws/websocket");
        const CrosswsWS = (crosswsModule.default ?? crosswsModule) as unknown as typeof WebSocket;
        return new CrosswsWS(url);
    }

    const wsModule = await import("ws");
    const NodeWebSocket = (wsModule.default ?? wsModule) as unknown as typeof WebSocket;
    return new NodeWebSocket(url);
}