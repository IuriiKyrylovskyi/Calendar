import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { AppProvider } from "./context";
import App from "./App";

const rootElement = document.querySelector("#root");

ReactDOM.render(
    <AppProvider>
      <App />
    </AppProvider>,
  rootElement
);
