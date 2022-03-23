import React from "react";
import VideoItem from "components/video_item/VideoItem";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";
import styles from "./VideoList.module.css";

type VideoListProps = {
  videos: VideoData[];
  dateCalculator: ICalcDateTime;
  onVideoClick: (video: VideoData) => void;
  display: string;
  setSelectedVideo: (value: React.SetStateAction<VideoData | null>) => void;
  setRelatedVideos: (value: React.SetStateAction<VideoData[]>) => void;
};

const VideoList = ({
  videos,
  dateCalculator,
  onVideoClick,
  display,
  setSelectedVideo,
  setRelatedVideos,
}: VideoListProps) => {
  return (
    <ul className={styles.videos}>
      {videos?.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          dateCalculator={dateCalculator}
          onVideoClick={onVideoClick}
          display={display}
          setSelectedVideo={setSelectedVideo}
          setRelatedVideos={setRelatedVideos}
        />
      ))}
    </ul>
  );
};
export default VideoList;
