import { ApolloClient } from 'apollo-boost';

import {
  GetPullRequestsQueryVariables,
  GET_PULL_REQUESTS_QUERY,
  GetPullRequestsQueryResponse,
} from './get-pull-requests-query';
import { ReviewStatsInputs, PullRequest } from '../types';
import { createSearchQueryString } from './create-search-query-string';

export function fetchPrs(
  client: ApolloClient<unknown>,
  inputs: ReviewStatsInputs,
) {
  /**
   * 1. Fetch first page of PRs
   * 2. Has next page?
   *   1. No - finish
   *   2. Yes - update current data, fetch next page, go to point 2
   */

  const variables: GetPullRequestsQueryVariables = {
    prsCount: 100,
    reviewsCount: 100,
    avatarSize: 200,
    query: createSearchQueryString(inputs),
  };

  const pullRequests: PullRequest[] = [];

  const fetchNextPage = (): Promise<PullRequest[]> =>
    client
      .query<GetPullRequestsQueryResponse>({
        query: GET_PULL_REQUESTS_QUERY,
        variables,
      })
      .then(({ data }) => {
        pullRequests.push(...data.search.nodes);

        const { hasNextPage, endCursor } = data.search.pageInfo;
        if (hasNextPage && endCursor) {
          console.log('has next page');

          variables.afterCursor = endCursor;

          return fetchNextPage();
        }

        return pullRequests;
      });

  return fetchNextPage();
}
