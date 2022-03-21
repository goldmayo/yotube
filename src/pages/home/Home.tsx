import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import VideoList from "components/video_list/VideoList";
import SearchHeader from "components/search_header/SearchHeader";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";
import { IYotubeService } from "services/yotubeService";
import VideoDetail from "components/video_detail/VideoDetail";
import { Routes, Route } from "react-router-dom";
type HomeProps = {
  yotube: IYotubeService;
  dateCalculator: ICalcDateTime;
};

const Home = ({ yotube, dateCalculator }: HomeProps) => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  const selectVideo = (video: VideoData) => {
    setSelectedVideo(video);
  };

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
    <>
      <div className={styles.app}>
        <SearchHeader onSearch={SearchQuery} />
        <section className={styles.content}>
          {selectedVideo && (
            <div className={styles.detail}>
              <VideoDetail video={selectedVideo} />
            </div>
          )}
          <div className={styles.list}>
            <VideoList videos={videos} dateCalculator={dateCalculator} onVideoClick={selectVideo} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
