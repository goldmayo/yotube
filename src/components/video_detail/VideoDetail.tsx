import React from "react";
import styles from "VideoDetail.module.css";
import { VideoData } from "components/data_forms/video_data/VideoData";

type VideoDetailProps = {
  video: VideoData;
};

const VideoDetail = ({ video }: VideoDetailProps) => (
  <section className={styles.detail}>
    <iframe
      title={video.snippet.title}
      className={styles.video}
      id="ytplayer"
      width="720"
      height="405"
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
