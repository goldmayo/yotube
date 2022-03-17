import { SearchVideoItemsData, VideoData } from "components/video_data/VideoData";

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
    let response = await fetch(
      `${this.BASE_URL}/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=25&regionCode=KR&key=${this.key}`,
      this.requestOptions
    );
    return response.json();
  };

  search = async (query: string) => {
    let rawData = await this.handleSearch(query);
    let IdData = rawData.items.map((item: SearchVideoItemsData) => ({
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
}
