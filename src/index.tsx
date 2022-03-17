import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import YotubeService from "./services/yotubeService";

const yotube = new YotubeService(`${process.env.REACT_APP_YOUTUBE_API_KEY}`);

ReactDOM.render(
  <React.StrictMode>
    <App yotube={yotube} />
  </React.StrictMode>,
  document.getElementById("root")
);
