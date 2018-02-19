import React = require("react");
import ReactDOM = require("react-dom");
import { hot } from "react-hot-loader";
import { Route } from "react-router-dom";
import styles = require("./styles/app.scss");

class App extends React.Component<{}, {}> {
    public render() {
        return <div className={styles.appContainer}>
            Some stuff.
        </div>;
    }
}

export default hot(module)(App);
