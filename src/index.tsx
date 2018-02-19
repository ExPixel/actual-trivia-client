import "./css/normalize.css";
import "./sass/main.scss";

import { Provider } from "mobx-react";
import React = require("react");
import ReactDOM = require("react-dom");
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";
import { RootStore } from "./store";

const store = new RootStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById("root"));
