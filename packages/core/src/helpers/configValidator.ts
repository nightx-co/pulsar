import { EventTriggerStrategy } from "../types/eventTriggerStrategry.types";
import { PulsarRuntime } from "../types/runtime.types";
import { MIN_SERVERLESS_TIMEOUT_LIMIT_SECOND } from "../static/config";

import type { ILogger } from "../integrations";
import type { EngineConfig } from "../types/base.types";
import type { EngineConsumerConfig } from "../types/consumer.types";
import type { QueueModule } from "./defineQueue";

export function configValidator(config : EngineConfig, logger : ILogger) {
    const validateTimeout = (timeout : number) => {
        if(timeout && timeout < MIN_SERVERLESS_TIMEOUT_LIMIT_SECOND) {
            const err = `Runtime Error : atleast ${MIN_SERVERLESS_TIMEOUT_LIMIT_SECOND} second of execution timeout is needed for pulsar to operate functionaly`;
            throw new Error(err);
        }
    }

    switch (config.runtime) {
        case PulsarRuntime.V8_ISOLATE:
            validateTimeout(config.isolate.maxTimeSec);
            break;
    
        case PulsarRuntime.SERVERLESS_VM:
            validateTimeout(config.timeoutSec);
            break;
    }

    if(config.apiKey.trim().length == 0) {
        throw new Error('[Pulsar] Invalid runtime configuration : An API key must be provided to initialize the client.');
    }

    const queues : Array<QueueModule> = config.queues;
    const consumers = queues.map(q => q.consumer);

    validateRuntimeRequiredDependencies(config, logger);
    validateDuplicatedQueues(logger, queues);
    validateConsumersType(config, logger, consumers);

    if(config.runtime === PulsarRuntime.PERSISTENT) {
        validateNetworkInterface(config, logger, consumers);
        validatePersistentRuntimePooling(config, logger);
    }

    validateQueuesNumericProperties(logger, queues);
    validateEngineSwarm(logger, config);
}


function validateNetworkInterface(config : EngineConfig & { runtime : PulsarRuntime.PERSISTENT }, logger : ILogger, consumers : EngineConsumerConfig[]) {
    const networkConfig = config.networkInterface;

    if (networkConfig.mode === "websocket") {
        const hasHttpConsumers = consumers.some(c => c.type === "http");
        if (hasHttpConsumers) {
            logger.error("Invalid network configuration : websocket-only mode cannot contain HTTP consumers as this causes orphan consumers and slot blocking.");
            throw new Error("Invalid network configuration : websocket-only mode cannot contain HTTP consumers as this causes orphan consumers and slot blocking.");
        }
    }
    else if (networkConfig.mode === "http") {
        const hasSocketConsumers = consumers.some(c => c.type === "socket");
        if (hasSocketConsumers) {
            logger.error("Invalid network configuration : HTTP mode cannot contain socket consumers.");
            throw new Error("Invalid network configuration : HTTP mode cannot contain socket consumers.");
        }
    }
}

function validatePersistentRuntimePooling(config : EngineConfig & { runtime : PulsarRuntime.PERSISTENT }, logger : ILogger) {
    if(config.eventTriggerStrategy == EventTriggerStrategy.POLLING) {
        const poolingIntervalMS = config.engine.poolingIntervalMS ?? 1000;
        if(poolingIntervalMS < 1 || !isFinite(poolingIntervalMS)) {
            logger.error('Invalid poolingIntervalMS configuration', { poolingIntervalMS });
            throw new Error(`Invalid poolingIntervalMS. Must be a finite number >= 1.`);
        }
    }
}

function validateQueuesNumericProperties(logger : ILogger, queues : QueueModule[]) {
    for (const queue of queues) {
        const concurrency = queue.concurrency ?? 1;
        if (concurrency < 1 || !isFinite(concurrency)) {
            logger.error('Invalid concurrency configuration', { concurrency });
            throw new Error(`Invalid concurrency: ${concurrency}. Must be a finite number >= 1.`);
        }
    
        const cycleTickLimit = queue.cycleTickLimit ?? 10;
        if (cycleTickLimit < 1 || !isFinite(cycleTickLimit)) {
            logger.error('Invalid cycleTickLimit configuration', { cycleTickLimit });
            throw new Error(`Invalid cycleTickLimit: ${cycleTickLimit}. Must be a finite number >= 1.`);
        }
    
        const maxJobsPerTick = queue.maxJobsPerTick ?? 1000;
        if (maxJobsPerTick < 1 || !isFinite(maxJobsPerTick)) {
            logger.error('Invalid maxJobsPerTick configuration', { maxJobsPerTick });
            throw new Error(`Invalid maxJobsPerTick: ${maxJobsPerTick}. Must be a finite number >= 1.`);
        }
    
        const n = queue.n ?? 10;
        if (n < 1 || !isFinite(n)) {
            logger.error('Invalid n configuration', { n });
            throw new Error(`Invalid n: ${n}. Must be a finite number >= 1.`);
        }
    
        const sleep = queue.sleep ?? 10;
        if (sleep < 0 || !isFinite(sleep)) {
            logger.error('Invalid sleep configuration', { sleep });
            throw new Error(`Invalid sleep: ${sleep}. Must be a finite number >= 0.`);
        }
    }
}

function validateConsumersType(config : EngineConfig, logger : ILogger, consumers : EngineConsumerConfig[]) {
    if(config.runtime !== PulsarRuntime.PERSISTENT) {
        const hasSocketConsumer = consumers.find(c => c.type == "socket");
        
        if(hasSocketConsumer) {
            logger.error(`${JSON.stringify(hasSocketConsumer)}`);
            throw new Error(`Consumers do not support non-persistent socket types. Please either remove the 'socket' type from the consumer or update the runtime to PERSISTENT.`);
        }
    }

    for(const consumer of consumers) {
        if(consumer.type == "http") {
            try {
                const parsedUrl = new URL(consumer.url);
                if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
                    logger.error(`${consumer.queue} - ${consumer.url}`);
                    throw new Error(`Invalid protocol '${parsedUrl.protocol}' for consumer URL. Only HTTP and HTTPS are supported.`);
                }
            }
            catch (error) {
                logger.error(`${consumer.queue} - ${consumer.url}`);
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while parsing the consumer URL.";
                throw new Error(`Failed to validate consumer URL: ${errorMessage}`);
            }
        }
        else if (consumer.type == "callback") {
            if(!consumer.handler) {
                throw new Error(`Consumer handler is required. Please provide a valid handler function.`);
            }
        }
    }
}

function validateDuplicatedQueues(logger : ILogger, queues : QueueModule[]) {
    if(queues.length == 0) {
        logger.error(`[Pulsar] Runtime configuration error: "queues" atleast 1 queue is required to operate.`);
        throw new Error(`[Pulsar] Runtime configuration error: "queues" atleast 1 queue is required to operate.`);
    }

    const queueCounts = queues.reduce<Record<string, number>>((acc, q) => {
        acc[q.queue] = (acc[q.queue] || 0) + 1;
        return acc;
    }, {})

    const duplicateQueueNames = Object.keys(queueCounts).filter(queueName => queueCounts[queueName]! > 1);

    if(duplicateQueueNames.length > 0) {
        logger.error("[ConfigurationStore]: Duplicate queues found -> ", duplicateQueueNames);
        throw new Error("Duplicate queue names detected in the configuration.");
    }
}

function validateRuntimeRequiredDependencies(config : EngineConfig, logger : ILogger) {
    if (config.runtime === PulsarRuntime.V8_ISOLATE && !config.isolate) {
        logger.error(`[Pulsar] Runtime configuration error: "isolate" instance is required when running in "${PulsarRuntime.V8_ISOLATE}" mode.`);
        throw new Error(`[Pulsar] Runtime configuration error: "isolate" instance is required when running in "${PulsarRuntime.V8_ISOLATE}" mode.`);
    }
}

function validateEngineSwarm(logger : ILogger, config : EngineConfig) {
    const cycleTickLimit = config.engine.cycleTickLimit ?? 1;
    const healthCheckIntervalSec = config.engine.healthCheckIntervalSec ?? 15;

    if(cycleTickLimit < 1 || !isFinite(cycleTickLimit)) {
        logger.error('Invalid concurrency configuration', { cycleTickLimit });
        throw new Error(`Invalid healthCheckIntervalSec: ${cycleTickLimit}. Must be a finite number >= 1.`);
    }

    if(healthCheckIntervalSec < 1 || !isFinite(healthCheckIntervalSec)) {
        logger.error('Invalid healthCheckIntervalSec configuration', { healthCheckIntervalSec });
        throw new Error(`Invalid healthCheckIntervalSec: ${healthCheckIntervalSec}. Must be a finite number >= 1.`);
    }
}