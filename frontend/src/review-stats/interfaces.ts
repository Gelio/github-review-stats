export interface ReviewStatsInputs {
  repository: string;
  fromDate: Date;
  toDate: Date;
}

export interface PullRequest {
  additions: number;
  author: {
    login: string;
  };
  changedFiles: number;
  deletions: number;
  number: number;
  permalink: string;
  reviews: {
    nodes: Array<{
      author: {
        login: string;
      };
      comments: {
        totalCount: number;
      };
      publishedAt: string;
      state: string;
    }>;
  };
  title: string;
  updatedAt: string;
}

export interface TransformedReview {
  name: string;
  count: number;
}
