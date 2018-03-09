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
        const resp = await this.client.auth.login(username, password);
        runInAction(() => {
            this.authInfo = resp.success ? resp.data : null;
            this.loggingIn = false;
        });
        this.saveAuthInfo();
        return resp.success;
    }

    @action
    public async signup(username: string, email: string, password: string): Promise<{ success: boolean, code: number, message: string }> {
        this.authInfo = null;
        this.loggingIn = false;
        this.signingUp = true;
        const resp = await this.client.auth.signup(username, email, password);
        runInAction(() => {
            this.signingUp = false;
        });

        return {
            success: resp.success,
            code: resp.code,
            message: resp.success ? "" : resp.message,
        };
    }

    @action
    public async logout(): Promise<boolean> {
        // #TODO send something to a /logout endpoint on the server or something that invalidates the token.
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
