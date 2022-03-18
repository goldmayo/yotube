import React from "react";
import styles from "./VideoList.module.css";
import VideoItem from "components/video_item/VideoItem";
import { VideoData } from "components/data_forms/video_data/VideoData";

type VideoListProps = {
  videos: VideoData[];
};

const VideoList = ({ videos }: VideoListProps) => {
  return (
    <ul className={styles.videos}>
      {videos?.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </ul>
  );
};
export default VideoList;
