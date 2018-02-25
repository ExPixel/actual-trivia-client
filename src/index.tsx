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

// this is just so I can keep track of them
const openColor = {
    orange4: "#ffa94d",
    orange5: "#ff922b",
    orange6: "#fd7e14",
    orange7: "#f76707",

    yellow5: "#fcc419",
};

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: openColor.orange4,
            main: openColor.orange5,
            dark: openColor.orange6,
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
