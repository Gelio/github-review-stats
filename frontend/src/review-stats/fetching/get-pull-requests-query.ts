import gql from 'graphql-tag';

import { PullRequest } from '../types';

export const GET_PULL_REQUESTS_QUERY = gql`
  query GetPullRequests(
    $prsCount: Int!
    $reviewsCount: Int!
    $query: String!
    $avatarSize: Int!
    $afterCursor: String
  ) {
    search(first: $prsCount, after: $afterCursor, type: ISSUE, query: $query) {
      nodes {
        ... on PullRequest {
          number
          permalink
          title
          createdAt
          updatedAt
          mergedAt
          closedAt
          changedFiles
          additions
          deletions
          state
          author {
            login
            avatarUrl(size: $avatarSize)
          }
          reviews(first: $reviewsCount) {
            nodes {
              author {
                login
                avatarUrl(size: $avatarSize)
              }
              comments {
                totalCount
              }
              publishedAt
              state
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      issueCount
    }
  }
`;

export interface GetPullRequestsQueryVariables {
  prsCount: number;
  reviewsCount: number;
  query: string;
  avatarSize: number;
  afterCursor?: string;
}

export interface GetPullRequestsQueryResponse {
  search: {
    nodes: PullRequest[];
    pageInfo: {
      endCursor?: string;
      hasNextPage: boolean;
    };
    issueCount: number;
  };
}
