import msgPack from '@msgpack/msgpack';
import WebSocket from "crossws/websocket";

import { Job } from "./Job";
import { BaseWorker } from "./base-worker";
import { PulsarUnifiedStorage } from "../storage/PulsarStorage";

import type { IBatchCandidate, IWorkerTransport, Processor, WorkerOptions } from "../types/worker.types";

export class Worker<T = any> extends BaseWorker<WorkerOptions> {
    
    protected override transport : IWorkerTransport = this;
    private readonly storage : PulsarUnifiedStorage;
    private socket : WebSocket | null = null;
    private isConnected : boolean = false;
    private reconnectTimer : ReturnType<typeof setTimeout> | null = null;

    constructor(queueName : string, private processor : Processor<T>, options : WorkerOptions) {
        super(queueName, options);
        
        this.storage = new PulsarUnifiedStorage(options.storage);
        this.socket = new WebSocket(this.options.wsConnectionString);

        this.connectToSocket();

        this.start();
    }

    private connectToSocket() {
        if (this.isConnected) return;

        if (this.socket) {
            this.socket.onopen = null;
            this.socket.onmessage = null;
            this.socket.onclose = null;
            this.socket.onerror = null;
            this.socket = null;
        }

        this.socket = new WebSocket(this.options.wsConnectionString);
        this.setupSocketListeners();
    }

    private setupSocketListeners() {
        if (!this.socket) return;

        const serializedPayload = JSON.stringify({ type : "REGISTER", queue : this.queueName });

        this.socket.onopen = async () => {
            this.isConnected = true;
            if (this.reconnectTimer) {
                clearTimeout(this.reconnectTimer);
                this.reconnectTimer = null;
            }
            this.socket?.send(serializedPayload);
        }
        
        this.socket.onmessage = async (event) => {
            const decodedPayload = msgPack.decode(event.data);
            
            if(decodedPayload) {
                const { batch, worker_id } = decodedPayload as IBatchCandidate;

                const jobs = batch.map((job) => new Job(job.msg_id, job));
                
                await this.handleProcesses(worker_id, jobs, this.processor);
            }
        }

        this.socket.onclose = async () => {
            this.isConnected = false;
            this.logger.log(`Connection Closed. Reconnecting in 2 seconds...`);
            this.scheduleReconnect();
        }

        this.socket.onerror = async () => {
            this.socket?.close();
        }
    }

    private scheduleReconnect() {
        if (this.reconnectTimer || this.isConnected) return;

        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connectToSocket();
        }, this.options.reconnectionDelay ?? 2000);
    }

    private async start() {
       
    }

    public async connect() {
        await this.storage.connect();
        this.storage.bindInstanceId('eu-central-1');
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