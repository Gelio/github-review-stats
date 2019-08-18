import { ApolloClient, ObservableQuery, ApolloQueryResult } from 'apollo-boost';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  GetPullRequestsQueryVariables,
  GET_PULL_REQUESTS_QUERY,
  GetPullRequestsQueryResponse,
} from './get-pull-requests-query';
import { ReviewStatsInputs, PullRequest } from '../types';
import { createSearchQueryString } from './create-search-query-string';
import ZenObservable from 'zen-observable';
import { zenObservableToRxJs } from './zen-observable-rxjs-adapter';

export function fetchPrs(
  client: ApolloClient<unknown>,
  inputs: ReviewStatsInputs,
): Observable<PullRequest[]> {
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

  const fetchNextPage = (): Observable<PullRequest[]> => {
    const getPullRequestsPage$ = zenObservableToRxJs(
    normalizeObservableQuery(
      client.watchQuery<GetPullRequestsQueryResponse>({
        query: GET_PULL_REQUESTS_QUERY,
        variables,
      }),
      ),
    );

    return getPullRequestsPage$.pipe(
      switchMap(({ data }) => {
        pullRequests.push(...data.search.nodes);

        const { hasNextPage, endCursor } = data.search.pageInfo;
        if (hasNextPage && endCursor) {
          variables.afterCursor = endCursor;

          return fetchNextPage();
        }

        return of(pullRequests);
      }),
    );
  };

  return fetchNextPage();
}

/**
 * Allows using `zen-observable` operators on an observable
 * TODO: remove after upgrading to `apollo-client@2.6.8`
 * @see https://github.com/apollographql/apollo-client/issues/3721
 */
function normalizeObservableQuery<T>(observableQuery: ObservableQuery<T>) {
  return ZenObservable.from((observableQuery as unknown) as ZenObservable<
    ApolloQueryResult<T>
  >);
}
