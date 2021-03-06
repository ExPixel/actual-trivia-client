import React = require("react");
import ReacDOM = require("react-dom");
import { Link, withRouter } from "react-router-dom";
import Flex from "../components/flex/Flex";
import { observer, inject } from "mobx-react";
import { getRootStore } from "../store";
import { IRouteLocation } from "../util";
import Branding from "../components/Branding";
import Typography from "../components/basic/Typography";
import Button from "../components/basic/Button";
import TextField from "../components/basic/TextField";
import { css } from "react-emotion";

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
            alert("Failed to login.");
        }
    }

    private async loginUserAsGuest() {
        const success = await this.userStore.loginAsGuest();
        if (!success) {
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
        return <div className={styleContainer}>
            <div className={styleContainerInner}>
                <Branding width="224px" />
                {/* <Typography style={{ marginBottom: "8px" }} variant="headline" component="h2">
                    Login to Actual Trivia
                </Typography> */}

                <Typography component="div">
                    <form onSubmit={this.onFormSubmit} style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>
                        <TextField
                            style={{ marginTop: "4px" }}
                            label="Username / Email"
                            onChange={this.onUsernameChange}
                            value={this.state.username} />
                        <TextField
                            style={{ marginTop: "4px" }}
                            label="Password"
                            type="password"
                            onChange={this.onPasswordChange}
                            value={this.state.password} />

                        {/* <Typography component="div" style={{marginTop: "16px"}}>
                            This is some wrong shit, fam.
                        </Typography> */}

                        <Flex style={{ marginTop: "32px" }} row justifyContent="flex-end">
                            <Button type="button" disabled={loggingIn} style={{ marginRight: "8px" }}
                                onClick={this.loginUserAsGuest}>Login As Guest</Button>
                            <Button disabled={loggingIn} loading={loggingIn} type="submit" raised color="primary">
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

const styleContainer = css`
display: flex;
flex-direction: column;
position: fixed;
left: 0;
bottom: 0;
right: 0;
top: 0;

align-items: center;
justify-content: center;
`;

const styleContainerInner = css`
padding: 16px;
max-width: 320px;
width: 320px;
overflow-y: auto;
`;

export default LoginPage;
