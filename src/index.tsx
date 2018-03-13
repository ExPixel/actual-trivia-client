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

mobx.useStrict(true);
const store = new RootStore(API);
store.userStore.loadAuthInfo(); // log us in 'n stuff
setRootStore(store);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById("root"));
