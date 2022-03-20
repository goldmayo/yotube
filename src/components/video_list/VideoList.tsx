import React from "react";
import styles from "./VideoList.module.css";
import VideoItem from "components/video_item/VideoItem";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";

type VideoListProps = {
  videos: VideoData[];
  dateCalculator: ICalcDateTime;
  onVideoClick: (video: VideoData) => void;
};

const VideoList = ({ videos, dateCalculator, onVideoClick }: VideoListProps) => {
  return (
    <ul className={styles.videos}>
      {videos?.map((video) => (
        <VideoItem key={video.id} video={video} dateCalculator={dateCalculator} onVideoClick={onVideoClick} />
      ))}
    </ul>
  );
};
export default VideoList;
