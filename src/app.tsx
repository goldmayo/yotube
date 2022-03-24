import React, { useCallback, useEffect, useState } from "react";
import SearchHeader from "components/search_header/SearchHeader";
import VideoList from "components/video_list/VideoList";
import VideoDetail from "components/video_detail/VideoDetail";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "./services/CalcDateTime";
import { IYotubeService } from "services/yotubeService";
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

  const goToMain = useCallback(() => {
    setSelectedVideo(null);
    setRelatedVideos([]);
  }, []);

  const SearchQuery = useCallback(
    async (query: string) => {
      setSelectedVideo(null);
      setRelatedVideos([]);
      //loading spinner
      let searchResult = await yotube.search(query);
      setVideos(searchResult);
    },
    [yotube]
  );

  useEffect(() => {
    console.log("app mounted");
    const getMostPopularKR = async () => {
      let vids = await yotube.mostPopular();
      setVideos(vids);
    };
    getMostPopularKR();
    console.log("mostPopular fetched");
  }, [yotube]);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={SearchQuery} onImageClick={goToMain} />
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
          />
        </div>
      </section>
    </div>
  );
};

export default App;
