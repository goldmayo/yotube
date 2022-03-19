import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import YotubeService from "./services/yotubeService";
import CalcDateTime from "services/CalcDateTime";
const yotube = new YotubeService(`${process.env.REACT_APP_YOUTUBE_API_KEY}`);
const dateCalculator = new CalcDateTime();

ReactDOM.render(
  <React.StrictMode>
    <App yotube={yotube} dateCalculator={dateCalculator} />
  </React.StrictMode>,
  document.getElementById("root")
);
