import React from "react";
import { VideoData } from "components/video_data/VideoData";
import VideoItem from "components/video_item/VideoItem";
import styles from "./VideoList.module.css";

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
