import {action, observable, runInAction, computed} from "mobx";
import { RootStore } from ".";
import { requireSuccess, TriviaAPIClient } from "../api";
import { ITriviaLoginResponse } from "../api/auth-api";
import MStorage from "../util/mstorage";

type IUserAuthInfo = ITriviaLoginResponse;

export class UserStore {
    public authInfo: IUserAuthInfo | null = null;
    @observable public loggingIn: boolean = false;

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

    /** Loads auth info from local storage */
    public loadAuthInfo() {
        this.authInfo = MStorage.getOr<IUserAuthInfo, null>("auth-info", null);
    }
}
