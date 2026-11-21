export class RuntimeCacheStorage {
    public static store : Map<string, any> = new Map();

    public kv = {
        set: <V>(key : string, value : V) => {
            RuntimeCacheStorage.store.set(key, value);
        },
        
        get: <K>(key : string) : K | undefined => {
            return RuntimeCacheStorage.store.get(key) as K;
        },
        
        has: (key : string) : boolean => {
            return RuntimeCacheStorage.store.has(key);
        },
        
        delete: (key : string) : boolean => {
            return RuntimeCacheStorage.store.delete(key);
        },
        
        clear: () => {
            RuntimeCacheStorage.store.clear();
        }
    }

    // future task : create a reference list, that holds function/object live reference and not static cache
    public references = this.kv;

    public lists = {
        add: (key : string, value : string) => {
            if (!RuntimeCacheStorage.store.has(key)) {
                RuntimeCacheStorage.store.set(key, new Set<string>());
            }
            const targetSet = RuntimeCacheStorage.store.get(key);
            if (targetSet instanceof Set) {
                targetSet.add(value);
            }
        },
        
        remove: (key : string, value : string) => {
            const targetSet = RuntimeCacheStorage.store.get(key);
            if (targetSet instanceof Set) {
                return targetSet.delete(value);
            }
            return false;
        },
        
        get: (key : string) : Set<string> | undefined => {
            const targetSet = RuntimeCacheStorage.store.get(key);
            return targetSet instanceof Set ? targetSet : undefined;
        },
        
        has: (key : string, value : string) : boolean => {
            const targetSet = RuntimeCacheStorage.store.get(key);
            if (targetSet instanceof Set) {
                return targetSet.has(value);
            }
            return false;
        }
    }
}

export const createRuntimeCacheStorage = () => new RuntimeCacheStorage();