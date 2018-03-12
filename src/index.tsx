import "./css/normalize.css";
import "./sass/main.scss";

import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import * as mobx from "mobx";
import { Provider } from "mobx-react";
import React = require("react");
import ReactDOM = require("react-dom");
import { BrowserRouter } from "react-router-dom";
import { API } from "./api";
import App from "./containers/App";
import { RootStore, setRootStore } from "./store";

mobx.useStrict(true);
const store = new RootStore(API);
store.userStore.loadAuthInfo(); // log us in 'n stuff
setRootStore(store);

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            light: "#757de8",
            main: "#3f51b5",
            dark: "#002984",
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#ffa270",
            main: "#ff7043",
            dark: "#c63f17",
            contrastText: "#000000",
        },
    },
});

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>
    , document.getElementById("root"));
