import React from "react";
import styles from "./VideoItem.module.css";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";
import { Link } from "react-router-dom";
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
      <Link to={`/detail?watch=${video.id}`}>
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
              <p className={styles.info}>{`조회수 ${video.statistics.viewCount} • ${dateCalculator.getTimeAgo(
                video.snippet.publishedAt
              )}`}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoItem;
