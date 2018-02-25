import { TriviaAuthAPI, ITriviaLoginResponse } from "./auth-api";
import { TriviaProfileAPI } from "./profile-api";

export interface IQuery {
    [prop: string]: string;
}

export interface IRequestData {
    query?: IQuery | undefined | null;
    body?: any;
}

export type IAPIResp<T> = IAPISuccessResp<T> | IAPIErrorResp;

export interface IAPISuccessResp<T> {
    code: number;
    success: true;
    data: T;
}

export interface IAPIErrorResp {
    code: number;
    success: false;
    message: string;
}

export class TriviaAPIClient {
    private origin: string;
    public authInfo: ITriviaLoginResponse | null = null;

    public auth: TriviaAuthAPI;
    public profile: TriviaProfileAPI;

    constructor(apiOrigin: string) {
        this.origin = apiOrigin;
        if (this.origin.endsWith("/")) {
            // remove the trailing / if there is one.
            this.origin = this.origin.substr(0, this.origin.length - 1);
        }

        this.auth = new TriviaAuthAPI(this);
        this.profile = new TriviaProfileAPI(this);
    }

    public setAuthInfo(loginResponse: ITriviaLoginResponse | null) {
        this.authInfo = loginResponse;
    }

    public mustRequest<T>(method: string, endpoint: string, body: any, authorize: boolean = true): Promise<IAPISuccessResp<T>> {
        return this.request<T>(method, endpoint, body, authorize).then((resp) => {
            return requireSuccess(resp);
        });
    }

    public request<T>(method: string, endpoint: string, data?: IRequestData, authorize: boolean = true): Promise<IAPIResp<T>> {
        // #TODO add a polyfill for the fetch API: https://github.com/github/fetch
        // browser support is pretty good, but I might as well.

        const url = this.getEndpointURL(endpoint);
        const headers: {[h: string]: string} = {};
        if (authorize) {
            if (this.authInfo) {
                headers.Authorization = "Bearer " + this.authInfo.authToken;
            }
        }

        const query: IQuery | null | undefined = data && data.query;
        if (query !== undefined && query !== null) {
            throw new Error("Shit, I need to implement query objects");
        }
        let body: any = data && data.body;
        if (typeof body === "object") {
            body = JSON.stringify(body);
        }

        return fetch(url, {
            method: method,
            headers: headers,
            body: body,
        }).then((resp) => {
            const status = resp.status;
            const ok = status >= 200 && status < 300;
            return resp.json().then((obj) => {
                if (ok) {
                    return obj as IAPISuccessResp<T>;
                } else {
                    return obj as IAPIErrorResp;
                }
            });
        });
    }

    /**
     * Gets the full URL for an endpoint.
     * e.g. /profile/me -> https://triviaurl/v1/profile/me
     * @param endpoint The endpoint to get the full URL for.
     */
    public getEndpointURL(endpoint: string): string {
        if (endpoint.startsWith("/")) {
            return this.origin + endpoint;
        } else {
            return this.origin + "/" + endpoint;
        }
    }
}

export function requireSuccess<T>(resp: IAPIResp<T>): IAPISuccessResp<T> {
    if (!resp.success) {
        throw new APIError(resp);
    } else {
        return resp;
    }
}

export class APIError extends Error {
    private code: number;

    constructor(err: IAPIErrorResp) {
        super(err.message);
        this.code = err.code;
    }
}

export const API = new TriviaAPIClient(process.env.API_ORIGIN || "");
