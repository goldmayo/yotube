import React from "react";
import VideoList from "components/video_list/VideoList";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";

type RelatedVideosProps = {
  videos: VideoData[];
  dateCalculator: ICalcDateTime;
  onVideoClick: (video: VideoData) => void;
};

const RelatedVideos = ({ videos, dateCalculator, onVideoClick }: RelatedVideosProps) => {
  return (
    <>
      <VideoList videos={videos} dateCalculator={dateCalculator} onVideoClick={onVideoClick} />
    </>
  );
};

export default RelatedVideos;
