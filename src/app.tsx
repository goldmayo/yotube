import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import VideoList from "components/video_list/VideoList";
import SearchHeader from "components/search_header/SearchHeader";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "./services/CalcDateTime";
import { IYotubeService } from "./services/yotubeService";

type AppProps = {
  yotube: IYotubeService;
  dateCalculator: ICalcDateTime;
};

const App = ({ yotube, dateCalculator }: AppProps) => {
  const [videos, setVideos] = useState<VideoData[]>([]);

  const SearchQuery = async (query: string) => {
    let searchResult = await yotube.search(query);
    setVideos(searchResult);
  };

  useEffect(() => {
    const getMostPopularKR = async () => {
      let vids = await yotube.mostPopular();
      setVideos(vids);
    };
    getMostPopularKR();
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={SearchQuery} />
      <VideoList videos={videos} dateCalculator={dateCalculator} />
    </div>
  );
};

export default App;
