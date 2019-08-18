import { CircularProgress } from '@material-ui/core';
import React, { FunctionComponent, useMemo } from 'react';
import { useApolloClient } from 'react-apollo';

import { ReviewStatsInputs } from './types';
import { MetricPickerWithCharts } from './metric-picker-with-charts';
import { fetchPrs, FetchingState } from './fetching/fetch-prs';
import { useObservable } from './fetching/use-observable';

interface QueryRepositoryProps {
  queryData: ReviewStatsInputs;
}

export const QueryRepository: FunctionComponent<QueryRepositoryProps> = ({
  queryData,
}) => {
  const apolloClient = useApolloClient();

  const fetchPrs$ = useMemo(() => fetchPrs(apolloClient, queryData), [
    apolloClient,
    queryData,
  ]);

  const fetchPrsState = useObservable(fetchPrs$);

  if (!fetchPrsState || fetchPrsState.state === FetchingState.Initializing) {
    return (
      <div>
        <p>Initializing (fetching the first page)</p>
        <CircularProgress />
      </div>
    );
  }

  switch (fetchPrsState.state) {
    case FetchingState.InProgress:
      return (
        <div>
          <p>
            Fetched pages: {fetchPrsState.fetchedPages}. Total PRs to fetch:{' '}
            {fetchPrsState.totalPrs}
          </p>
        </div>
      );

    case FetchingState.Error:
      return <div>Error: {fetchPrsState.errorMessage}</div>;

    case FetchingState.Finished:
      return (
        <div>
          <MetricPickerWithCharts pullRequests={fetchPrsState.pullRequests} />
        </div>
      );
  }
};
