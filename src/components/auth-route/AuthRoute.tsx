import React = require("react");
import ReactDOM = require("react-dom");
import { observer } from "mobx-react";
import { Route, RouteProps, Redirect, withRouter, RouteComponentProps } from "react-router";
import { getRootStore } from "../../store";

@observer
class AuthRoute extends React.Component<RouteProps, {}> {
    private readonly userStore = getRootStore().userStore;

    constructor(props: RouteProps) {
        super(props);
    }

    // @observer overrides this unless I have this here
    // and I need this to always return true if I want this thing
    // to interact with react router correctly.
    public shouldComponentUpdate() {
        return true;
    }

    public render() {
        const {component: RawComponent, ...routeProps} = this.props;
        const Component: any = RawComponent as any;

        return <Route {...routeProps} render={(props) => (
            this.userStore.loggedIn ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />;
    }
}

export default AuthRoute;
