export type JobContext<T = any> = {
    /**
     * The ID Of Worker Which Picked This Batch
     * 
     * When using callback, the consumer must deregister using this worker id for freeing up the slot
    ***/
    workerId : string;
    
    /***
     * The ID Of The Queue From Which This Batch Was Picked
    ***/
    queue : string;

    /***
     * The Payloads Of The Batch
    ***/
    payload : T;

    /***
     * The Number Of Attempts This Job Has Undergone
    ***/
    attempts : number;
    timestamp : number;
}

export type EngineConsumerConfig =
    | { 
            type : "http";
            queue : string;
            url : string; 
            headers? : Record<string, string>; 
            timeoutMs? : number; 

            /**
             * Enables MessagePack payload optimization, reducing payload size by up to 30% 
             * or more to conserve bandwidth. 
             * 
             * @remarks
             * This optimization is incompatible with AWS Lambda or other FaaS environments 
             * that intercept, read, or modify the raw request bytes before the handler executes.
             * 
             * @default
             * true
            */
            optimizePayload?: boolean;
        }
    |
        { 
            type : "socket";
            queue : string;
            /**
             * Enables MessagePack payload optimization, reducing payload size by up to 30% 
             * or more to conserve bandwidth. 
             * 
             * @remarks
             * This optimization is incompatible with AWS Lambda or other FaaS environments 
             * that intercept, read, or modify the raw request bytes before the handler executes.
             * 
             * @default
             * true
            */
            optimizePayload?: boolean;
        }
    |
    {
        type : "callback";
        queue : string;
        handler(job : JobContext) : Promise<void>;
        /**
         * Enables MessagePack payload optimization, reducing payload size by up to 30% 
         * or more to conserve bandwidth. 
         * 
         * @remarks
         * This optimization is incompatible with AWS Lambda or other FaaS environments 
         * that intercept, read, or modify the raw request bytes before the handler executes.
         * 
         * @default
         * true
        */
        optimizePayload?: boolean;
    };