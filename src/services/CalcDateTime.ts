export interface ICalcDateTime {
  DateDiff: {
    inMinutes: (d1: Date, d2: Date) => number;
    inHours: (d1: Date, d2: Date) => number;
    inDays: (d1: Date, d2: Date) => number;
    inWeeks: (d1: Date, d2: Date) => number;
    inMonths: (d1: Date, d2: Date) => number;
    inYears: (d1: Date, d2: Date) => number;
  };
  getTimeAgo: (value: string) => string;
}

export default class CalcDateTime {
  private readonly date: Date;
  constructor() {
    this.date = new Date();
  }
  DateDiff = {
    inMinutes: function (d1: Date, d2: Date): number {
      const t2 = d2.getTime();
      const t1 = d1.getTime();
      return Math.floor((t2 - t1) / (60 * 1000));
    },

    inHours: function (d1: Date, d2: Date): number {
      const t2 = d2.getTime();
      const t1 = d1.getTime();
      return Math.floor((t2 - t1) / (3600 * 1000));
    },

    inDays: function (d1: Date, d2: Date): number {
      const t2 = d2.getTime();
      const t1 = d1.getTime();

      return Math.floor((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1: Date, d2: Date): number {
      const t2 = d2.getTime();
      const t1 = d1.getTime();

      return Math.floor((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1: Date, d2: Date): number {
      const d1Y = d1.getFullYear();
      const d2Y = d2.getFullYear();
      const d1M = d1.getMonth();
      const d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    },

    inYears: function (d1: Date, d2: Date): number {
      return d2.getFullYear() - d1.getFullYear();
    },
  };
  getTimeAgo = (value: string): string => {
    const publishedDate = new Date(value);
    const currentMonthDays = new Date(this.date.getFullYear(), (this.date.getMonth() + 1) % 11, 0).getDate();
    if (this.DateDiff.inMinutes(publishedDate, this.date) < 1) {
      return `방금전`;
    }
    const diffMinutes = this.DateDiff.inMinutes(publishedDate, this.date);
    if (diffMinutes < 60) {
      return `${diffMinutes}분전`;
    }
    const diffHours = this.DateDiff.inHours(publishedDate, this.date);
    if (diffHours < 24) {
      return `${diffHours}시간전`;
    }
    const diffDays = this.DateDiff.inDays(publishedDate, this.date);
    if (diffDays < 7) {
      return `${diffDays}일전`;
    }
    const diffWeeks = this.DateDiff.inWeeks(publishedDate, this.date);
    if (diffWeeks < 5 && diffDays < currentMonthDays) {
      return `${diffWeeks}주전`;
    }
    const diffMonths = this.DateDiff.inMonths(publishedDate, this.date);
    if (diffMonths < 12) {
      return `${diffMonths}개월전`;
    }
    const diffYears = this.DateDiff.inYears(publishedDate, this.date);
    return `${diffYears}년전`;
  };
}
