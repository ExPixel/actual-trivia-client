import "./css/normalize.css";
import "./sass/main.scss";

import * as mobx from "mobx";
import { Provider } from "mobx-react";
import React = require("react");
import ReactDOM = require("react-dom");
import { BrowserRouter } from "react-router-dom";
import { API } from "./api";
import App from "./containers/App";
import { RootStore, setRootStore } from "./store";
import { ThemeProvider } from "emotion-theming";
import { LightTheme } from "./theme";

mobx.configure({
    enforceActions: true,
    disableErrorBoundaries: true,
});

const store = new RootStore(API);
store.userStore.loadAuthInfo(); // log us in 'n stuff
setRootStore(store);

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={LightTheme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
    , document.getElementById("root"));
