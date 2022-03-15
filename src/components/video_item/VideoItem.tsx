import React from "react";
import { VideoData } from "components/video_data/VideoData";

type VideoItemProps = {
  video: VideoData;
};

const VideoItem = ({ video }: VideoItemProps) => {
  return <h1>{video.snippet.title}</h1>;
};

export default VideoItem;
