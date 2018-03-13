import React = require("react");
import ReacDOM = require("react-dom");
import { Link, withRouter } from "react-router-dom";
import Flex from "../components/flex/Flex";
import styles = require("./styles/login.scss");
import { observer, inject } from "mobx-react";
import { getRootStore } from "../store";
import { IRouteLocation } from "../util";
import Branding from "../components/Branding";
import Typography from "../components/basic/Typography";
import Button from "../components/basic/Button";
import TextField from "../components/basic/TextField";

export interface ILoginPageState {
    username: string;
    password: string;
}

@observer
class LoginPage extends React.Component<{}, ILoginPageState> {
    private readonly userStore = getRootStore().userStore;
    public state = {
        username: "",
        password: "",
    };

    constructor(props: {}) {
        super(props);

        this.loginUser = this.loginUser.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.loginUserAsGuest = this.loginUserAsGuest.bind(this);
    }

    private async loginUser() {
        const success = await this.userStore.login(this.state.username, this.state.password);
        if (!success) {
            // #TODO show an error on the login form when this fails.
            alert("Failed to login.");
        }
    }

    private async loginUserAsGuest() {
        const success = await this.userStore.loginAsGuest();
        if (!success) {
            // #TODO show an error on the login form when this fails.
            alert("Failed to login as guest.");
        }
    }

    private onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: e.target.value });
    }

    private onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: e.target.value });
    }

    private onFormSubmit(e: React.UIEvent<HTMLFormElement>) {
        e.preventDefault();
        this.loginUser();
    }

    // @observer overrides this unless I have this here
    // and I need this to always return true if I want this thing
    // to interact with react router correctly.
    public shouldComponentUpdate() {
        return true;
    }

    public render() {
        const loggingIn = this.userStore.loggingIn;
        return <div className={styles.container}>
            <div className={styles.containerInner}>
                <Branding width="100%" />
                {/* <Typography style={{ marginBottom: "8px" }} variant="headline" component="h2">
                    Login to Actual Trivia
                </Typography> */}

                <Typography component="div">
                    <form onSubmit={this.onFormSubmit} style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>
                        <TextField
                            style={{ marginTop: "8px" }}
                            label="Username / Email"
                            onChange={this.onUsernameChange}
                            value={this.state.username} />
                        <TextField
                            style={{ marginTop: "8px" }}
                            label="Password"
                            type="password"
                            onChange={this.onPasswordChange}
                            value={this.state.password} />

                        <Flex style={{ marginTop: "32px" }} row justifyContent="flex-end">
                            <Button disabled={loggingIn} style={{ marginRight: "8px" }}
                                onClick={this.loginUserAsGuest}>Login As Guest</Button>
                            <Button disabled={loggingIn} loading={loggingIn} type="submit" color="primary">
                                Login
                            </Button>
                        </Flex>

                        <Typography style={{ marginTop: "32px" }} component="div">
                            <Link to="/signup">Don't have an account? Sign up.</Link>
                        </Typography>
                    </form>
                </Typography>
            </div>
        </div>;
    }
}

// inject()
export default LoginPage;
