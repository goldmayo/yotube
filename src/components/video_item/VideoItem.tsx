import React from "react";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";
import styles from "./VideoItem.module.css";

type VideoItemProps = {
  video: VideoData;
  dateCalculator: ICalcDateTime;
  onVideoClick: (videoId: VideoData) => void;
  display: string;
};

const VideoItem = ({ video, dateCalculator, onVideoClick, display }: VideoItemProps) => {
  const displayType = display === "list" ? styles.list : styles.grid;

  return (
    <li className={`${styles.container} ${displayType}`} onClick={() => onVideoClick(video)}>
      <div className={`${styles.video} ${displayType}`}>
        <img
          className={`${styles.thumbnail} ${displayType}`}
          src={video.snippet.thumbnails.medium.url}
          alt={`${video.snippet.title} thumbnail`}
        />
        <div className={`${styles.metadata} ${displayType}`}>
          {display === "grid" && (
            <img
              className={styles.channelThumbnail}
              src={video.channelThumbnail}
              alt={`${video.snippet.channelTitle}'s thumbnail`}
            />
          )}
          <div className={styles.textdata}>
            <p className={styles.title}>{video.snippet.title}</p>
            <p className={styles.channel}>{video.snippet.channelTitle}</p>
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
