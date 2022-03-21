import { SearchVideoData } from "components/data_forms/search_video_data/SearchVideoData";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ChannelData } from "components/data_forms/channel_data/ChannelData";

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
  private readonly key: string;
  private readonly BASE_URL = process.env.REACT_APP_BASE_URL;
  readonly requestOptions: RequestInit;

  constructor(key: string) {
    this.key = key;
    this.requestOptions = {
      method: "GET",
      redirect: "follow",
    };
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
    let response = await fetch(
      `${this.BASE_URL}/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR&key=${this.key}`,
      this.requestOptions
    );
    return response.json();
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
    let response = await fetch(
      `${this.BASE_URL}/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
      this.requestOptions
    );
    return response.json();
  };

  fetchStatistics = async (videoId: string) => {
    let videoStatisticsData = await fetch(
      `${this.BASE_URL}/videos?part=statistics&id=${videoId}&key=${this.key}`,
      this.requestOptions
    );
    return videoStatisticsData.json();
  };

  fetchChannelInfo = async (channelId: string) => {
    let resonse = await fetch(
      `${this.BASE_URL}/channels?part=snippet&id=${channelId}&key=${this.key}`,
      this.requestOptions
    );
    return resonse.json();
  };

  fetchRelatedVideos = async (videoId: string) => {
    let response = await fetch(
      `${this.BASE_URL}/search?part=snippet&maxResults=25&relatedToVideoId=${videoId}&type=video&key=${this.key}`,
      this.requestOptions
    );
    return response.json();
  };
}
