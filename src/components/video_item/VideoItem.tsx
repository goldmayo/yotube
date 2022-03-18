import React from "react";
import styles from "./VideoItem.module.css";
import { VideoData } from "components/data_forms/video_data/VideoData";

type VideoItemProps = {
  video: VideoData;
};

const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <li className={styles.container}>
      <div className={styles.video}>
        <img
          className={styles.thumbnail}
          src={video.snippet.thumbnails.medium.url}
          alt={`${video.snippet.title} thumbnail`}
        />
        <div className={styles.metadata}>
          <img
            className={styles.channelThumbnail}
            src={video.channelThumbnail}
            alt={`${video.snippet.channelTitle}'s thumbnail`}
          />
          <div className={styles.textdata}>
            <p className={styles.title}>{video.snippet.title}</p>
            <p className={styles.channel}>{video.snippet.channelTitle}</p>
            <p className={styles.info}>{`조회수 ${video.statistics.viewCount} • ${video.snippet.publishedAt}`}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
