export type NetworkDriverMode = "http" | "websocket" | "hybrid" | "client";

export interface NetworkConfig {
    mode : NetworkDriverMode;
    port : number;
    host? : string;
    isServer : boolean;
}

export interface NetworkPayload {
    queue : string;
    action : string;
    data : any;
}