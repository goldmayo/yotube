import React from "react";
import VideoList from "components/video_list/VideoList";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ICalcDateTime } from "services/CalcDateTime";

type RelatedVideosProps = {
  videos: VideoData[];
  dateCalculator: ICalcDateTime;
  onVideoClick: (videoId: VideoData) => void;
  display: string;
};

const RelatedVideos = ({ videos, dateCalculator, onVideoClick, display }: RelatedVideosProps) => {
  return (
    <>
      <VideoList videos={videos} dateCalculator={dateCalculator} onVideoClick={onVideoClick} display={display} />
    </>
  );
};

export default RelatedVideos;
