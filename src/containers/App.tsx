import React = require("react");
import ReactDOM = require("react-dom");
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";
import { combineStyles } from "../util";
import LoginPage from "./LoginPage";
import MainMenu from "./MainMenu";
import { getRootStore } from "../store";
import AuthRoute from "../components/auth-route/AuthRoute";
import { Redirect } from "react-router";
import { observer } from "mobx-react";
import { observe } from "mobx";
import TriviaGameScreen from "./TriviaGameScreen";
import RegisterPage from "./RegisterPage";
import PageNotFound from "./PageNotFound";
import styled from "../theme/styled";

export interface IProps {
    className?: string;
}

@observer
class App extends React.Component<IProps, {}> {
    private readonly userStore = getRootStore().userStore;
    private stopObservingUserStore: (() => any) | null = null;

    public componentWillMount() {
        // This bug was pretty annoying for a couple of hours.
        // Because App never "directly" uses userStore.loggedIn
        // and instead uses it through the `render` callbacks
        // of the various routes, it never actually observes the
        // observable on its own causing it to never rerender.
        // We fix this here by manually observing the property.
        this.stopObservingUserStore = observe(this.userStore, "loggedIn", () => {
            this.forceUpdate();
        });
    }

    public componentWillUnmount() {
        if (this.stopObservingUserStore) {
            this.stopObservingUserStore();
            this.stopObservingUserStore = null;
        }
    }

    // @observer overrides this unless I have this here
    // and I need this to always return true if I want this thing
    // to interact with react router correctly.
    public shouldComponentUpdate() {
        return true;
    }

    public render() {
        return <div className={this.props.className}>
            <Switch>
                <Route exact={true} path="/" render={() => {
                    return <Redirect to={ this.userStore.loggedIn ? "/menu" : "/login" } />;
                }} />

                <Route exact={true} path="/login" render={(props) => (
                    this.userStore.loggedIn ?
                        <Redirect to="/menu" /> :
                        <LoginPage />
                )} />

                <Route exact={true} path="/signup" render={(props) => (
                    this.userStore.loggedIn ?
                        <Redirect to="/menu" /> :
                        <RegisterPage />
                )} />

                <AuthRoute exact={true} path="/menu" component={MainMenu} />
                <AuthRoute exact={true} path="/game/:gameId" component={TriviaGameScreen} />

                <Route component={PageNotFound} />
            </Switch>
        </div>;
    }
}

export default hot(module)(styled(App)`
position: fixed;
left: 0;
right: 0;
bottom: 0;
top: 0;

overflow-y: auto;

// Make these themeable:
background: ${({theme}) => theme.palette.background};
color: ${({theme}) => theme.palette.text.primary};
`);
