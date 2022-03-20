import React from "react";
import styles from "./VideoItem.module.css";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";

type VideoItemProps = {
  video: VideoData;
  dateCalculator: ICalcDateTime;
  onVideoClick: (video: VideoData) => void;
};

const VideoItem = ({ video, dateCalculator, onVideoClick }: VideoItemProps) => {
  return (
    <li className={styles.container} onClick={() => onVideoClick(video)}>
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
            {/* <p className={styles.info}>{`조회수 ${video.statistics.viewCount} • ${getTimeAgo(
              video.snippet.publishedAt
            )}`}</p> */}
            <p className={styles.info}>{`조회수 ${video.statistics.viewCount} • ${dateCalculator.getTimeAgo(
              video.snippet.publishedAt
            )}`}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
