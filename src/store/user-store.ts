import {action, observable, runInAction, computed} from "mobx";
import { RootStore } from ".";
import { requireSuccess, TriviaAPIClient } from "../api";
import { ITriviaLoginResponse } from "../api/auth-api";
import MStorage from "../util/mstorage";

type IUserAuthInfo = ITriviaLoginResponse;

export class UserStore {
    @observable public authInfo: IUserAuthInfo | null = null;
    @observable public loggingIn: boolean = false;
    @observable public signingUp: boolean = false;

    constructor(private rootStore: RootStore, private client: TriviaAPIClient) {}

    @computed
    public get loggedIn(): boolean {
        return !this.loggingIn && !!this.authInfo;
    }

    @action
    public async login(username: string, password: string): Promise<boolean> {
        this.authInfo = null;
        this.loggingIn = true;
        try {
            const resp = await this.client.auth.login(username, password);
            runInAction(() => {
                this.authInfo = resp.success ? resp.data : null;
                this.loggingIn = false;
            });
            this.saveAuthInfo();
            return resp.success;
        } catch (e) {
            runInAction(() => {
                this.loggingIn = false;
            });
            console.error("an error occurred while logging in: ", e);
            return false;
        }
    }

    @action
    public async signup(username: string, email: string, password: string): Promise<{ success: boolean, code: number, message: string }> {
        this.authInfo = null;
        this.loggingIn = false;
        this.signingUp = true;

        try {
            const resp = await this.client.auth.signup(username, email, password);
            runInAction(() => {
                this.signingUp = false;
            });

            return {
                success: resp.success,
                code: resp.code,
                message: resp.success ? "" : resp.message,
            };
        } catch (e) {
            runInAction(() => {
                this.signingUp = false;
            });

            console.error("error occurred while signing up: ", e);
            return {
                success: false,
                code: -1,
                message: e + "",
            };
        }
    }

    @action
    public async logout(): Promise<boolean> {
        if (this.authInfo && this.authInfo.authToken) {
            try {
                const resp = await this.client.auth.logout(this.authInfo.authToken);
                if (resp.success && !resp.data) {
                    console.warn("logout response successful, but resp.data = false");
                }
            } catch (e) {
                console.error("error occurred while logging out: ", e);
            }
        }
        this.deleteAuthInfo();
        runInAction(() => {
            this.authInfo = null;
            this.loggingIn = false;
        });
        return true;
    }

    @action
    public async loginAsGuest(): Promise<boolean> {
        this.authInfo = null;
        this.loggingIn = true;
        const resp = await this.client.auth.loginAsGuest();
        runInAction(() => {
            this.authInfo = resp.success ? resp.data : null;
            this.loggingIn = false;
        });
        this.saveAuthInfo();
        return resp.success;
    }

    /** Saves auth info into local storage. */
    private saveAuthInfo() {
        MStorage.set("auth-info", this.authInfo);
    }

    /** Removes auth info from local storage. */
    private deleteAuthInfo() {
        MStorage.remove("auth-info");
    }

    /** Loads auth info from local storage */
    public loadAuthInfo() {
        this.authInfo = MStorage.getOr<IUserAuthInfo, null>("auth-info", null);
    }
}
