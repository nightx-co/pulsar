import type { EventTriggerStrategy } from "./eventTriggerStrategry.types";
import type { PulsarRuntime } from "./runtime.types";

type RawPathKeys<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends Array<any>
        ? `${K}` : T[K] extends object
        ? `${K}` | `${K}.${RawPathKeys<T[K]>}` : `${K}`;
    }[keyof T & (string | number)]
  : never;

/**
 * Define exact paths or prefix patterns that MUST NOT be mutated via set().
 *    - 'storage' | 'storage.${string}': Storage instance should not be swapped on the fly.
 *    - 'runtime': Prevents switching execution environment at runtime.
 *    - 'onEvents' | 'onEvents.${string}': Prevents overwriting event hooks.
 */
type BlockedPaths =
  | "storage"
  | `storage.${string}`
  | "runtime"
  | "onEvents"
  | `onEvents.${string}`
  | "isolate"
  | `isolate.${string}`;

/**
 * Filtered paths allowed specifically for `set()` operations.
 */
export type SettablePathKeys<T> = Exclude<RawPathKeys<T>, BlockedPaths>;

/**
 * All paths available for `get()` operations (unrestricted read access).
 */
export type ReadablePathKeys<T> = RawPathKeys<T>;

/**
 * Type utility to infer the value type corresponding to a dot-notation path string.
 */
export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T ? PathValue<T[K], Rest> : never
  : P extends keyof T ? T[P] : never;


export interface IConfigurationObject {
    queues : Array<{ queue : string, pooler : string }>;
    self_url : string;
    runtime : PulsarRuntime;
    event_trigger_strategy : EventTriggerStrategy
}

export interface IConfigSyncResult {
    isChanged: boolean;
    isNew: boolean;
    oldConfigurations?: IConfigurationObject;
    delta?: {
        urlChanged: boolean;
        addedQueues: Array<{ queue: string; pooler: string }>;
        removedQueues: Array<{ queue: string; pooler: string }>;
        modifiedQueues: Array<{ queue: string; oldPooler: string; newPooler: string }>;
    }
}