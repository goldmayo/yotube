import React, { useEffect, useState } from "react";
import SearchHeader from "components/search_header/SearchHeader";
import VideoList from "components/video_list/VideoList";
import VideoDetail from "components/video_detail/VideoDetail";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "./services/CalcDateTime";
import { IYotubeService } from "./services/yotubeService";
import styles from "./app.module.css";

type AppProps = {
  yotube: IYotubeService;
  dateCalculator: ICalcDateTime;
};

const App = ({ yotube, dateCalculator }: AppProps) => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [relatedVideos, setRelatedVideos] = useState<VideoData[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const SearchRelatedVideos = async (videoId: string) => {
    let relatedVideos = await yotube.searchRelatedVideos(videoId);
    setRelatedVideos(relatedVideos);
  };

  const selectVideo = (video: VideoData) => {
    setSelectedVideo(video);
    SearchRelatedVideos(video.id);
  };

  const SearchQuery = async (query: string) => {
    setSelectedVideo(null);
    setRelatedVideos([]);
    //loading spinner
    let searchResult = await yotube.search(query);
    setVideos(searchResult);
  };

  useEffect(() => {
    console.log("app mounted");
    const getMostPopularKR = async () => {
      let vids = await yotube.mostPopular();
      setVideos(vids);
    };
    getMostPopularKR();
    console.log("mostPopular fetched");
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={SearchQuery} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={selectedVideo ? relatedVideos : videos}
            dateCalculator={dateCalculator}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
            setSelectedVideo={setSelectedVideo}
            setRelatedVideos={setRelatedVideos}
          />
        </div>
      </section>
    </div>
  );
};

export default App;
