import { ApolloClient, ObservableQuery } from 'apollo-boost';

import {
  GetPullRequestsQueryVariables,
  GET_PULL_REQUESTS_QUERY,
  GetPullRequestsQueryResponse,
} from './get-pull-requests-query';
import { ReviewStatsInputs, PullRequest } from '../types';
import { createSearchQueryString } from './create-search-query-string';
import Observable from 'zen-observable-ts';

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

  const fetchNextPage = () =>
    normalizeObservableQuery(
      client.watchQuery<GetPullRequestsQueryResponse>({
        query: GET_PULL_REQUESTS_QUERY,
        variables,
      }),
    ).flatMap<PullRequest[]>(
      ({ data }): Observable<PullRequest[]> => {
        pullRequests.push(...data.search.nodes);

        const { hasNextPage, endCursor } = data.search.pageInfo;
        if (hasNextPage && endCursor) {
          variables.afterCursor = endCursor;

          return fetchNextPage();
        }

        return Observable.of(pullRequests);
      },
    );

  return fetchNextPage();
}

/**
 * Allows using `zen-observable` operators on an observable
 * TODO: remove after upgrading to `apollo-client@2.6.8`
 * @see https://github.com/apollographql/apollo-client/issues/3721
 */
function normalizeObservableQuery<T>(observableQuery: ObservableQuery<T>) {
  return Observable.from(observableQuery);
}
