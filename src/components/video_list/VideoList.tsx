import React from "react";
import styles from "./VideoList.module.css";
import VideoItem from "components/video_item/VideoItem";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";

type VideoListProps = {
  videos: VideoData[];
  dateCalculator: ICalcDateTime;
  onVideoClick: (video: VideoData) => void;
  display: string;
};

const VideoList = ({ videos, dateCalculator, onVideoClick, display }: VideoListProps) => {
  return (
    <ul className={styles.videos}>
      {videos?.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          dateCalculator={dateCalculator}
          onVideoClick={onVideoClick}
          display={display}
        />
      ))}
    </ul>
  );
};
export default VideoList;
