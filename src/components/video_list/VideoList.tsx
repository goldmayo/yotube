import React from "react";
import styles from "./VideoList.module.css";
import VideoItem from "components/video_item/VideoItem";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";

type VideoListProps = {
  videos: VideoData[];
  dateCalculator: ICalcDateTime;
};

const VideoList = ({ videos, dateCalculator }: VideoListProps) => {
  return (
    <ul className={styles.videos}>
      {videos?.map((video) => (
        <VideoItem key={video.id} video={video} dateCalculator={dateCalculator} />
      ))}
    </ul>
  );
};
export default VideoList;
