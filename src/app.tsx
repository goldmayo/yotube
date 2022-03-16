import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import VideoList from "components/video_list/VideoList";
import { VideoData } from "components/video_data/VideoData";
import SearchHeader from "components/search_header/SearchHeader";

const App = () => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [videos, setVideos] = useState<VideoData[]>([]);
  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };
    console.log("fetching from youtube...");
    fetch(
      `${BASE_URL}/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR&key=${API_KEY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setVideos(result.items);
        console.log("fetching success");
      })
      .catch((error) => console.log("!Error : fetching videos from youtube fail.", error));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader />
      <VideoList videos={videos} />
    </div>
  );
};

export default App;
