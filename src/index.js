// index.js
import React from "react";
import ReactDOM from "react-dom";
import "dotenv/config";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
