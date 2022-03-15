import React, { useEffect, useState } from "react";
import "./app.css";
import VideoList from "components/video_list/VideoList";

const App = () => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${BASE_URL}/videos?part=snippet&chart=mostPopular&maxResults=25&key=${API_KEY}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setVideos(result.item))
      .catch((error) => console.log("!Error : fetching videos from youtube fail.", error));
  }, []);
  return <VideoList videos={videos} />;
};

export default App;
