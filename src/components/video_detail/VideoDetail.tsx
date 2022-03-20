import React from "react";
import styles from "VideoDetail.module.css";
import { VideoData } from "components/data_forms/video_data/VideoData";

type VideoDetailProps = {
  video: VideoData;
};

const VideoDetail = ({ video }: VideoDetailProps) => {
  return <h1>{video.snippet.title}</h1>;
};

export default VideoDetail;
