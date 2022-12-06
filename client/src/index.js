/**
 * This file deploys the webapp by calling the App object as defined in App.js
 * @author Mohona Ghosh
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import "./components/Layout/index.css";

ReactDOM.render(<App/>, document.getElementById("root"))