import { ApolloClient, ObservableQuery, ApolloQueryResult } from 'apollo-boost';
import { of, Observable, concat, merge } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Reducer, Action } from 'redux';

import {
  GetPullRequestsQueryVariables,
  GET_PULL_REQUESTS_QUERY,
  GetPullRequestsQueryResponse,
} from './get-pull-requests-query';
import { ReviewStatsInputs, PullRequest } from '../types';
import { createSearchQueryString } from './create-search-query-string';
import ZenObservable from 'zen-observable';
import { zenObservableToRxJs } from './zen-observable-rxjs-adapter';

export enum FetchingState {
  Initializing = 'INITIALIZING',
  InProgress = 'IN_PROGRESS',
  Finished = 'FINISHED',
  Error = 'ERROR',
}

export type FetchingPullRequestsData =
  | {
      state: FetchingState.Initializing;
    }
  | {
      state: FetchingState.InProgress;
      pullRequests: PullRequest[];
      totalPrs: number;
      fetchedPages: number;
    }
  | { state: FetchingState.Finished; pullRequests: PullRequest[] }
  | {
      state: FetchingState.Error;
      pullRequests: PullRequest[];
      totalPrs: number;
      errorMessage: string;
    };

const initialState: FetchingPullRequestsData = {
  state: FetchingState.Initializing,
};

type FetchPrsAction =
  | {
      type: 'FIRST_PAGE';
      pullRequests: PullRequest[];
      totalPrs: number;
    }
  | { type: 'NEXT_PAGE'; pullRequests: PullRequest[] }
  | { type: 'ERROR'; errorMessage: string };

const fetchPrsReducer: Reducer<FetchingPullRequestsData, FetchPrsAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'FIRST_PAGE':
      if (action.pullRequests.length === action.totalPrs) {
        return {
          state: FetchingState.Finished,
          pullRequests: action.pullRequests,
        };
      }

      return {
        state: FetchingState.InProgress,
        pullRequests: action.pullRequests,
        fetchedPages: 1,
        totalPrs: action.totalPrs,
      };

    case 'NEXT_PAGE': {
      if (state.state !== FetchingState.InProgress) {
        return state;
      }

      const allFetchedPrs = [...state.pullRequests, ...action.pullRequests];

      if (
        state.pullRequests.length + action.pullRequests.length >=
        state.totalPrs
      ) {
        return {
          state: FetchingState.Finished,
          pullRequests: allFetchedPrs,
        };
      }

      return {
        state: FetchingState.InProgress,
        pullRequests: allFetchedPrs,
        fetchedPages: state.fetchedPages + 1,
        totalPrs: state.totalPrs,
      };
    }

    case 'ERROR': {
      const errorState: FetchingPullRequestsData = {
        state: FetchingState.Error,
        pullRequests: [],
        totalPrs: 0,
        errorMessage: action.errorMessage,
      };

      if (state.state === FetchingState.InProgress) {
        errorState.pullRequests = state.pullRequests;
        errorState.totalPrs = state.totalPrs;
      }

      return errorState;
    }
  }

  return state;
};

type DispatcherReturningState<State, Action> = (action: Action) => State;
const reducerWithState = <State, A extends Action<any>>(
  reducer: Reducer<State, A>,
): [State, DispatcherReturningState<State, A>] => {
  let state = reducer(undefined, { type: '' } as any);

  return [
    state,
    (action) => {
      state = reducer(state, action);

      return state;
    },
  ];
};

export function fetchPrs(
  client: ApolloClient<unknown>,
  inputs: ReviewStatsInputs,
): Observable<FetchingPullRequestsData> {
  /**
   * 1. Fetch first page of PRs
   * 2. Has next page?
   *   1. No - finish
   *   2. Yes - update current data, fetch next page, go to point 2
   */

  const [initialState, dispatch] = reducerWithState(fetchPrsReducer);
  let state = initialState;

  const variables: GetPullRequestsQueryVariables = {
    prsCount: 100,
    reviewsCount: 100,
    avatarSize: 200,
    query: createSearchQueryString(inputs),
  };

  const getPullRequestsPage = () =>
    zenObservableToRxJs(
      normalizeObservableQuery(
        client.watchQuery<GetPullRequestsQueryResponse>({
          query: GET_PULL_REQUESTS_QUERY,
          variables,
        }),
      ),
    );

  const fetchNextPage = (): Observable<FetchingPullRequestsData> => {
    return getPullRequestsPage().pipe(
      switchMap(({ data }) => {
        if (state.state === FetchingState.Initializing) {
          state = dispatch({
            type: 'FIRST_PAGE',
            pullRequests: data.search.nodes,
            totalPrs: data.search.issueCount,
          });
        } else {
          state = dispatch({
            type: 'NEXT_PAGE',
            pullRequests: data.search.nodes,
          });
        }

        const { hasNextPage, endCursor } = data.search.pageInfo;
        if (hasNextPage && endCursor) {
          variables.afterCursor = endCursor;

          return merge(of(state), fetchNextPage());
        }

        return of(state);
      }),
    );
  };

  return concat(
    of(state),
    fetchNextPage().pipe(
      catchError((error) => {
        console.error('Error when fetching next page', error, state);
        state = dispatch({
          type: 'ERROR',
          errorMessage: 'Error while fetching next page',
        });

        return of(state);
      }),
    ),
  );
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
