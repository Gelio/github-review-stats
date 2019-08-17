export interface ReviewStatsInputs {
  repository: string;
  fromDate: Date;
  toDate: Date;
}

export enum PullRequestReviewState {
  Pending = 'PENDING',
  Commented = 'COMMENTED',
  Approved = 'APPROVED',
  ChangesRequested = 'CHANGES_REQUESTED',
  Dismissed = 'DISMISSED',
}

export enum PullRequestState {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Merged = 'MERGED',
}

export interface Actor {
  avatarUrl: string;
  login: string;
}

export interface PullRequestReview {
  author: Actor;
  comments: {
    totalCount: number;
  };
  publishedAt: string;
  state: PullRequestReviewState;
}

export interface PullRequest {
  permalink: string;
  number: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  mergedAt?: string;
  closedAt?: string;
  changedFiles: number;
  additions: number;
  deletions: number;
  author: Actor;
  reviews: {
    nodes: PullRequestReview[];
  };
}

export interface TransformedReview {
  name: string;
  count: number;
}
