import { SearchVideoData } from "components/data_forms/search_video_data/SearchVideoData";
import { VideoData } from "components/data_forms/video_data/VideoData";
import { ChannelData } from "components/data_forms/channel_data/ChannelData";

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
    let rawData = await this.handleSearch(query);
    let IdData = rawData.items.map((item: SearchVideoData) => ({
      ...item,
      id: item.id.videoId,
    }));
    let IdStatData = await Promise.all(
      IdData.map(async (item: VideoData) => {
        let statData = await this.fetchStatistics(item.id);
        return { ...item, statistics: statData.items[0].statistics };
      })
    );
    return IdStatData;
  };

  handleSearch = async (query: string) => {
    let searchData = await fetch(
      `${this.BASE_URL}/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
      this.requestOptions
    );
    return searchData.json();
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
}
