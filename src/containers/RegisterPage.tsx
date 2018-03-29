import React = require("react");
import ReacDOM = require("react-dom");
import { Link, withRouter } from "react-router-dom";
import Flex from "../components/flex/Flex";
import { observer, inject } from "mobx-react";
import { getRootStore } from "../store";
import { IRouteLocation } from "../util";
import Typography from "../components/basic/Typography";
import TextField from "../components/basic/TextField";
import Button from "../components/basic/Button";
import Branding from "../components/Branding";
import { css } from "react-emotion";

const USERNAME_REGEX = new RegExp("^[a-zA-Z0-9_\\-\\.\\<\\>]+$");
const EMAIL_REGEX = new RegExp("^[^@]+@[^@]+$");

export interface IState {
    username: string;
    password: string;
    email: string;
    password2: string;

    errors: {
        // This is just an error message that shows at the top of the form.
        global?: string | undefined | null;
        password2?: string | undefined | null;
        username?: string | undefined | null;
        email?: string | undefined | null;
        password?: string | undefined | null;
    };
}

@observer
class RegisterPage extends React.Component<{}, IState> {
    private readonly userStore = getRootStore().userStore;

    constructor(props: {}) {
        super(props);

        this.signupUser = this.signupUser.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
        };
    }

    private async signupUser() {
        if (this.checkFormErrors()) {
            const response = await this.userStore.signup(this.state.username, this.state.email, this.state.password);
            if (!response.success) {
                alert("Failed to register: " + response.message);
            } else {
                alert("Registration successful.");
            }
        }
    }

    /**
     * Returns true if there are no form errors.
     */
    private checkFormErrors(): boolean {
        let err: boolean = true;
        const errors: IState["errors"] = {};
        const state = this.state;
        // username length in range [3, 64]
        if (state.username.length < 3 || state.username.length > 64) {
            err = false;
            errors.username = "Username must be from 3 to 64 characters long.";
        }

        // username has no invalid characters (and no previous username errors)
        if (!state.username.trim().match(USERNAME_REGEX) && !errors.username) {
            err = false;
            errors.username = "Username can only contain the characters a-z, A-Z, 0-9, <, >, -, _, and .";
        }

        // password length in range [6, 256]
        if (state.password.length < 6 || state.password.length > 256) {
            err = false;
            errors.password = "Password must be from 6 to 256 characters long.";
        }

        // password2 == password (and no password errors)
        if (state.password2 !== state.password && !errors.password) {
            err = false;
            errors.password2 = "Re-entered password does not match password";
        }

        if (!state.email.trim().match(EMAIL_REGEX)) {
            err = false;
            errors.email = "Must provide a valid email address (or login as a guest ¯\\_(ツ)_/¯).";
        }

        this.setState({errors});
        return err;
    }

    private onFormSubmit(e: React.UIEvent<HTMLFormElement>) {
        e.preventDefault();
        this.signupUser();
    }

    private onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        // ^ these events should bubble to the form but I'm not sure if that's consistent across browsers.
        let change: Partial<IState>;
        switch (e.target.name) {
        case "username": change = {username: e.target.value}; break;
        case "email": change = {email: e.target.value}; break;
        case "password": change = {password: e.target.value}; break;
        case "repassword": change = {password2: e.target.value}; break;
        default: change = {}; break;
        }
        this.setState(change as any);
    }

    // @observer overrides this unless I have this here
    // and I need this to always return true if I want this thing
    // to interact with react router correctly.
    public shouldComponentUpdate() {
        return true;
    }

    public render() {
        const signingUp = this.userStore.signingUp;
        return <div className={styleContainer}>
            <div className={styleContainerInner}>
                <Branding width="224px" />

                <Typography component="div">
                    <form style={{ display: "flex", alignItems: "stretch", flexDirection: "column" }}
                        onSubmit={this.onFormSubmit} >
                        <TextField
                            error = {!!this.state.errors.username}
                            helperText={this.state.errors.username}
                            style={{ marginTop: "8px" }}
                            name="username"
                            label="Username"
                            onChange={this.onInputChange}
                            value={this.state.username} />
                        <TextField
                            error = {!!this.state.errors.email}
                            helperText={this.state.errors.email}
                            style={{ marginTop: "8px" }}
                            name="email"
                            label="Email"
                            onChange={this.onInputChange}
                            value={this.state.email} />
                        <TextField
                            error = {!!this.state.errors.password}
                            helperText={this.state.errors.password}
                            style={{ marginTop: "8px" }}
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.onInputChange}
                            value={this.state.password} />
                        <TextField
                            error = {!!this.state.errors.password2}
                            helperText={this.state.errors.password2}
                            style={{ marginTop: "8px" }}
                            name="repassword"
                            label="Re-Enter Password"
                            type="password"
                            onChange={this.onInputChange}
                            value={this.state.password2} />
                        <Flex style={{ marginTop: "32px" }} row justifyContent="flex-end">
                            <Button disabled={signingUp} loading={signingUp} type="submit" color="primary">Sign Up</Button>
                        </Flex>

                        <Typography style={{ marginTop: "32px" }} component="div">
                            <Link to="/login">Already have an account? Log in.</Link>
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

export default RegisterPage;
