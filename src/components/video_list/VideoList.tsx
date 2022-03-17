import React from "react";
import styles from "./VideoList.module.css";
import { VideoData } from "components/video_data/VideoData";
import VideoItem from "components/video_item/VideoItem";

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
