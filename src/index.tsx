import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import YotubeService from "services/yotubeService";
import CalcDateTime from "services/CalcDateTime";
import "./index.css";
import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
});
const yotube = new YotubeService(httpClient);
const dateCalculator = new CalcDateTime();

ReactDOM.render(
  <React.StrictMode>
    <App yotube={yotube} dateCalculator={dateCalculator} />
  </React.StrictMode>,
  document.getElementById("root")
);
