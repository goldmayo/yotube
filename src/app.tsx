import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import VideoList from "components/video_list/VideoList";
import SearchHeader from "components/search_header/SearchHeader";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "./services/CalcDateTime";
import { IYotubeService } from "./services/yotubeService";
import VideoDetail from "components/video_detail/VideoDetail";
import RelatedVideos from "components/related_videos/RelatedVideos";

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
    // console.log(relatedVideos);
    setRelatedVideos(relatedVideos);
  };

  const selectVideo = (video: VideoData) => {
    setSelectedVideo(video);
    // console.log("selectedVideo", selectedVideo);
    SearchRelatedVideos(video.id);
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
    <div className={styles.app}>
      <SearchHeader onSearch={SearchQuery} />
      <section className={styles.content}>
        {selectedVideo && (
          <>
            <div className={styles.detail}>
              <VideoDetail video={selectedVideo} />
            </div>
            <div className={styles.list}>
              <RelatedVideos
                videos={relatedVideos}
                dateCalculator={dateCalculator}
                onVideoClick={selectVideo}
                display={selectedVideo ? "list" : "grid"}
              />
            </div>
          </>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            dateCalculator={dateCalculator}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </section>
    </div>
    // <div className={styles.app}>
    //   <SearchHeader onSearch={SearchQuery} />
    //   <section className={styles.content}>
    //     {selectedVideo && (
    //       <div className={styles.detail}>
    //         <VideoDetail video={selectedVideo} />
    //       </div>
    //     )}
    //     <div className={styles.list}>
    //       <VideoList
    //         videos={videos}
    //         dateCalculator={dateCalculator}
    //         onVideoClick={selectVideo}
    //         display={selectedVideo ? "list" : "grid"}
    //       />
    //     </div>
    //   </section>
    // </div>
  );
};

export default App;
