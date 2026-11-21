import { decode } from '@msgpack/msgpack';

import { Job } from "./Job";
import { BaseWorker } from "./base-worker";
import { PulsarUnifiedStorage } from "../storage/PulsarStorage";

import type { IBatchCandidate, IWorkerTransport, Processor, WorkerOptions } from "../types/worker.types";
import { createSocket } from '../helpers/createSocket';

export class Worker<T = any> extends BaseWorker<WorkerOptions> {
    
    protected override transport : IWorkerTransport = this;
    private readonly storage : PulsarUnifiedStorage;
    
    private socket : WebSocket | null = null;
    private isConnected : boolean = false;
    private reconnectTimer : ReturnType<typeof setTimeout> | null = null;

    private reconnectAttempts = 0;
    private maxReconnectAttempts = 1000;

    constructor(queueName : string, private processor : Processor<T>, options : WorkerOptions) {
        super(queueName, options);
        
        this.storage = new PulsarUnifiedStorage(options.storage);
        this.connectToSocket();
        this.start();
    }

    private async connectToSocket() {
        if (this.isConnected) return;

        if (this.socket) {
            this.socket.onopen = null;
            this.socket.onmessage = null;
            this.socket.onclose = null;
            this.socket.onerror = null;
            this.socket = null;
        }
        this.socket = await createSocket(this.options.wsConnectionString);
        this.socket.binaryType = "arraybuffer";
        this.setupSocketListeners();
    }

    private setupSocketListeners() {
        const socket = this.socket;
        if (!socket) return;

        const serializedPayload = JSON.stringify({ type : "REGISTER", queue : this.queueName });

        socket.onopen = async () => {
            this.isConnected = true;
            this.reconnectAttempts = 0;
            if (this.reconnectTimer) {
                clearTimeout(this.reconnectTimer);
                this.reconnectTimer = null;
            }
            this.socket?.send(serializedPayload);    
        }
         
        socket.onmessage = async (event) => {
            await this.onMessage(event);
        }

        socket.onclose = async () => {
            if (this.socket !== socket) return;
            this.isConnected = false;
            this.scheduleReconnect();
        }

        socket.onerror = async () => {
            if (this.socket !== socket) return;
            
            if (this.socket !== socket) return;
            
            if (socket.readyState === WebSocket.CLOSED) {
                this.isConnected = false;
                this.scheduleReconnect();
            }
        }
    }

    private scheduleReconnect() {
        if (this.reconnectTimer || this.isConnected) return;
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.logger.error(`[Worker] Max reconnection attempts (${this.maxReconnectAttempts}) reached. Stopping reconnect loop.`);
            return;
        }

        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        this.reconnectAttempts++;

        this.logger.log(`[Worker] Reconnecting in ${(delay / 1000)}s (Attempt ${this.reconnectAttempts})...`);

        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connectToSocket();
        }, delay);
    }

    private async start() {}

    public async connect() {
        await this.storage.connect();
    }

    private async onMessage(event : MessageEvent) {
        try {
            const rawData = event.data;
            const decodedPayload = decode(rawData as any) as { type : "STORAGE_BIND" | "DISPATCH_BATCH", data : any };
        
            if (decodedPayload) {
                const eventType = decodedPayload.type;

                if(eventType == "STORAGE_BIND") {
                    const instanceId = decodedPayload.data?.instance_id as string;
                    this.logger.log(`Binding Storage Instance ID (${instanceId})`);
                    this.storage.bindInstanceId(instanceId);
                }

                if(eventType === "DISPATCH_BATCH") {
                    const { batch, worker_id } = decodedPayload.data as IBatchCandidate<T>;

                    if (batch && Array.isArray(batch)) {
                        const jobs = batch.map((job) => new Job<T>(job.msg_id, job.headers, job.message));
                        await this.handleProcesses(worker_id, jobs, this.processor);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error("[Worker] socket.onmessage processing error: ", error);       
        }
    }
    
    public async ack(q : string, ids : number | Array<number>) {
        await this.storage.ops.ack(q, ids);
    }
          
    public async nack(q : string, ids : number | Array<number>) {
        await this.storage.ops.nack(q, ids);
    }    
        
    public async retry(q : string, ids : number | Array<number>) {
        await this.storage.ops.retry(q, ids);
    }

    public async deregister(workerId : string) {
        await this.storage.repository.deregisterWorker(workerId, this.queueName);
    }

    async pause() {
        this.logger.log(`Worker for queue "${this.queueName}" paused.`);
    }

    async resume() {
        this.logger.log(`Worker for queue "${this.queueName}" resumed.`);
    }
}