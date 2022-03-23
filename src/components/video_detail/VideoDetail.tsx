import React from "react";
import { VideoData } from "components/data_forms/video_data/VideoData";
import styles from "./VideoDetail.module.css";

type VideoDetailProps = {
  video: VideoData;
};

const VideoDetail = ({ video }: VideoDetailProps) => (
  <section className={styles.detail}>
    <iframe
      title={video.snippet.title}
      className={styles.video}
      id="ytplayer"
      width="100%"
      height="672px"
      src={`https://www.youtube.com/embed/${video.id}`}
      frameBorder="0"
      allowFullScreen
    ></iframe>
    <h2>{video.snippet.title}</h2>
    <h3>{video.snippet.channelTitle}</h3>
    <pre className={styles.description}>{video.snippet.description}</pre>
  </section>
);

export default VideoDetail;
