import { Button } from '@material-ui/core';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { useApolloClient } from 'react-apollo';

import { ReviewStatsInputs } from './types';
import { MetricPickerWithCharts } from './metric-picker-with-charts';
import {
  fetchPrs,
  FetchingState,
  FetchingPullRequestsData,
} from './fetching/fetch-prs';
import { useObservable } from './fetching/use-observable';
import { FetchingProgress } from './fetching-progress';

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
        <FetchingProgress variant="indeterminate" />
      </div>
    );
  }

  switch (fetchPrsState.state) {
    case FetchingState.InProgress:
      return (
        <div>
          <FetchingProgress
            variant="determinate"
            fetchedPrs={fetchPrsState.pullRequests.length}
            totalPrs={fetchPrsState.totalPrs}
          />
        </div>
      );

    case FetchingState.Error:
      return <FetchingErrorPage fetchPrsState={fetchPrsState} />;

    case FetchingState.Finished:
      return (
        <div>
          <MetricPickerWithCharts pullRequests={fetchPrsState.pullRequests} />
        </div>
      );
  }
};

const FetchingErrorPage: FunctionComponent<{
  fetchPrsState: FetchingPullRequestsData;
}> = ({ fetchPrsState }) => {
  const [shouldShowAnyway, setShouldShowAnyway] = useState(false);

  if (fetchPrsState.state !== FetchingState.Error) {
    throw new Error(
      `${FetchingErrorPage.displayName} should only be passed data in the ${FetchingState.Error} state`,
    );
  }

  if (shouldShowAnyway) {
    return (
      <div>
        <p>Error: {fetchPrsState.errorMessage}</p>
        <p>
          Showing PR stats for {fetchPrsState.pullRequests.length} of{' '}
          {fetchPrsState.totalPrs} PRs anyway
        </p>

        <MetricPickerWithCharts pullRequests={fetchPrsState.pullRequests} />
      </div>
    );
  }

  return (
    <div>
      <p>Error: {fetchPrsState.errorMessage}</p>

      {fetchPrsState.pullRequests.length > 0 && (
        <>
          <p>
            Fetched data for {fetchPrsState.pullRequests.length} of{' '}
            {fetchPrsState.totalPrs} PRs.
          </p>

          <Button
            onClick={() => setShouldShowAnyway(true)}
            color="secondary"
            variant="contained"
          >
            Show PR data anyway
          </Button>
        </>
      )}
    </div>
  );
};
