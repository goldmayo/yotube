import { AxiosInstance } from "axios";
import { SearchVideoData } from "components/data_forms/search_video_data/SearchVideoData";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ChannelData } from "components/data_forms/channel_data/ChannelData";
import qs from "qs";

export interface IYotubeService {
  mostPopular: () => Promise<any[]>;
  fetchMostPopular: () => Promise<any>;
  search: (query: string) => Promise<any[]>;
  searchRelatedVideos: (videoId: string) => Promise<any[]>;
  fetchSearch: (query: string) => Promise<any>;
  fetchStatistics: (videoId: string) => Promise<any>;
  fetchChannelInfo: (channelId: string) => Promise<any>;
  fetchRelatedVideos: (videoId: string) => Promise<any[]>;
}

export default class YotubeService {
  // private readonly key = process.env.REACT_APP_YOUTUBE_API_KEY;
  private yotube;
  constructor(httpClient: AxiosInstance) {
    this.yotube = httpClient;
  }

  mostPopular = async () => {
    let mostPopularData = await this.fetchMostPopular();
    let withChannelThumbnailData = await Promise.all(
      mostPopularData.items.map(async (item: VideoData) => {
        let channelInfo: ChannelData = await this.fetchChannelInfo(item.snippet.channelId);
        return { ...item, channelThumbnail: channelInfo.items[0].snippet.thumbnails.default.url };
      })
    );
    return withChannelThumbnailData;
  };

  fetchMostPopular = async () => {
    const response = await this.yotube.get("/videos", {
      params: {
        part: ["snippet", "statistics"],
        chart: "mostPopular",
        maxResults: 25,
        regionCode: "KR",
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    });

    return response.data;
  };

  search = async (query: string) => {
    let searchData = await this.fetchSearch(query);
    let searchIdData = searchData.items.map((item: SearchVideoData) => ({
      ...item,
      id: item.id.videoId,
    }));
    let IdStatData = await Promise.all(
      searchIdData.map(async (item: VideoData) => {
        let statisticsData = await this.fetchStatistics(item.id);
        let channelData = await this.fetchChannelInfo(item.snippet.channelId);
        return {
          ...item,
          statistics: statisticsData.items[0].statistics,
          channelThumbnail: channelData.items[0].snippet.thumbnails.default.url,
        };
      })
    );

    return IdStatData;
  };

  searchRelatedVideos = async (videoId: string) => {
    let rawRelatedVideos = await this.fetchRelatedVideos(videoId);
    let hasSnippets = rawRelatedVideos.items
      .filter((item: SearchVideoData) => item.hasOwnProperty("snippet"))
      .map((item: SearchVideoData) => ({ ...item, id: item.id.videoId }));
    let relatedVideos = await Promise.all(
      hasSnippets.map(async (item: VideoData) => {
        let statisticsData = await this.fetchStatistics(item.id);
        let channelData = await this.fetchChannelInfo(item.snippet.channelId);
        return {
          ...item,
          statistics: statisticsData.items[0].statistics,
          channelThumbnail: channelData.items[0].snippet.thumbnails.default.url,
        };
      })
    );
    return relatedVideos;
  };

  fetchSearch = async (query: string) => {
    const response = await this.yotube.get("/search", {
      params: {
        part: "snippet",
        type: "video",
        maxResults: 25,
        q: `${query}`,
      },
    });
    return response.data;
  };

  fetchStatistics = async (videoId: string) => {
    const response = await this.yotube.get("/videos", {
      params: {
        part: "statistics",
        id: `${videoId}`,
      },
    });
    return response.data;
  };

  fetchChannelInfo = async (channelId: string) => {
    const response = await this.yotube.get("/channels", {
      params: {
        part: "snippet",
        id: `${channelId}`,
      },
    });
    return response.data;
  };

  fetchRelatedVideos = async (videoId: string) => {
    const response = await this.yotube.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: `${videoId}`,
        maxResults: 25,
        type: "video",
      },
    });
    return response.data;
  };
}
