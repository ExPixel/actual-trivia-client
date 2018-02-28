import { IAPIResp, TriviaAPIClient } from ".";

export class TriviaAuthAPI {
    constructor(private client: TriviaAPIClient) {}

    public async login(username: string, password: string): Promise<IAPIResp<ITriviaLoginResponse>> {
        return this.client.request<ITriviaLoginResponse>("POST", "/auth/login", {
            body: {
                username: username,
                password: password,
            },
        });
    }

    public async loginAsGuest(): Promise<IAPIResp<ITriviaLoginResponse>> {
        return this.client.request<ITriviaLoginResponse>("POST", "/auth/guest");
    }
}

export interface ITriviaLoginResponse {
    authToken: string;
    /** Unix timestamp for time at which auth token is no longer valid.  */
    authTokenExpiresAt: number;
    refreshToken: string;
    /** Unix timestamp for time at which refresh token is no longer valid.  */
    refreshTokenExpiresAt: number;
}