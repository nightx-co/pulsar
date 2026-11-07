// deno-lint-ignore-file no-explicit-any
declare global {
    namespace EdgeRuntime {
        /**
         * Extends the lifespan of the event loop until the provided promise settles.
         * Useful for background tasks like logging or flushing queues after returning a Response.
         */
        function waitUntil(promiseOrFn: Promise<any> | (() => Promise<any>)): void;
    }
}

export {};