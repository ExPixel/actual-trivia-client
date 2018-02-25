// tslint:disable-next-line:interface-name class-name
export interface _MStorageTTL {
    storedTime: number;
    expiresIn: number;
}

// tslint:disable-next-line:class-name
export class _MStorage {
    public TTL_SECOND: number    = 1000;
    public TTL_MINUTE: number    = 1000 * 60;
    public TTL_HOUR: number      = 1000 * 60 * 60;
    public TTL_DAY: number       = 1000 * 60 * 60 * 24;
    public TTL_WEEK: number      = 1000 * 60 * 60 * 24 * 7;

    constructor(private prefix: string) {}

    public get all() { return this.getAll(false); }
    public getAll(includeMetadata: boolean = false): any {
        const pref = `${this.prefix}:`;
        const output: any = {};
        for (const key in localStorage) {
            if (key.startsWith(pref)) {
                if (!includeMetadata) {
                    if (key.endsWith("::~ttl")) { continue; }
                }
                const realKey = key.substr(pref.length);
                const value = localStorage[key];
                output[realKey] = JSON.parse(value);
            }
        }
        return output;
    }

    public set(key: string, value: any) {
        const json = JSON.stringify(value);
        localStorage.setItem(`${this.prefix}:${key}`, json);
    }

    public get<T>(key: string): T | undefined {
        return this.getOr<T, undefined>(key, undefined);
    }

    public getOr<T, O>(key: string, or: O): T | O {
        const json = localStorage.getItem(`${this.prefix}:${key}`);
        if (json) {
            try {
                return JSON.parse(json);
            } catch (e) {
                console.error(`Error while parsing JSON for item "${this.prefix}:${key}"`, e);
                localStorage.removeItem(`${this.prefix}:${key}`);
            }
        }
        return or;
    }

    public ttlSet(key: string, ttl: number, value: any) {
        const ttlObj: _MStorageTTL = { storedTime: Date.now(), expiresIn: ttl };
        this.set(key, value);
        this.set(key + "::~ttl", ttlObj);
    }

    public ttlGet<T>(key: string): T | undefined {
        const ttlObj = this.get<_MStorageTTL>(key + "::~ttl");
        if (ttlObj) {
            const now = Date.now();
            if (now > (ttlObj.storedTime + ttlObj.expiresIn)) {
                this.ttlRemove(key);
                return undefined;
            }
        }
        return this.get<T>(key);
    }

    public ttlGetWithTTL<T>(key: string): [T | undefined, _MStorageTTL | undefined] {
        const ttlObj = this.get<_MStorageTTL>(key + "::~ttl");
        if (ttlObj) {
            const now = Date.now();
            if (now > (ttlObj.storedTime + ttlObj.expiresIn)) {
                this.ttlRemove(key);
                return [undefined, ttlObj];
            }
        }
        return [this.get<T>(key), ttlObj];
    }

    public ttlRemove<T>(key: string) {
        this.remove(key + "::~ttl");
        this.remove(key);
    }

    public getRaw(key: string): string | undefined {
        const json = localStorage.getItem(`${this.prefix}:${key}`);
        return json || undefined;
    }

    public remove(key: string) {
        localStorage.removeItem(`${this.prefix}:${key}`);
    }
}

const MStorage = new _MStorage("actrivia");
export default MStorage;
