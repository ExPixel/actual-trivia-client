import Button from "material-ui/Button";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import React = require("react");
import ReacDOM = require("react-dom");
import { Link, withRouter } from "react-router-dom";
import Flex from "../components/flex/Flex";
import styles = require("./styles/login.scss");
import { observer, inject } from "mobx-react";
import { getRootStore } from "../store";
import { IRouteLocation } from "../util";

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

    // @observer overrides this unless I have this here
    // and I need this to always return true if I want this thing
    // to interact with react router correctly.
    public shouldComponentUpdate() {
        return true;
    }

    public render() {
        return <div className={styles.container}>
            <Card className={styles.card}>
                <CardContent>
                    <Typography style={{ marginBottom: "8px" }} variant="headline" component="h2">
                        Login to Actual Trivia
                    </Typography>

                    <Typography component="div">
                        <Flex column alignItems="stretch">
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
                                <Button style={{ marginRight: "8px" }} onClick={this.loginUserAsGuest}>Login As Guest</Button>
                                <Button color="primary" variant="raised" onClick={this.loginUser}>Login</Button>
                            </Flex>

                            <Typography style={{ marginTop: "32px" }} component="div">
                                <Link to="/signup">Don't have an account? Sign up.</Link>
                            </Typography>
                        </Flex>
                    </Typography>
                </CardContent>
            </Card>
        </div>;
    }
}

// inject()
export default LoginPage;
