import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { AppProvider } from "./context";
import App from "./App";

const rootElement = document.querySelector("#root");

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  rootElement
);
