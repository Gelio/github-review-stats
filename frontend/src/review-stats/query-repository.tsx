import { CircularProgress } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState, useMemo } from 'react';
import { useApolloClient } from 'react-apollo';

import { ReviewStatsInputs } from './types';
import { MetricPickerWithCharts } from './metric-picker-with-charts';
import { fetchPrs } from './fetching/fetch-prs';
import { useObservable } from './fetching/use-observable';

interface QueryRepositoryProps {
  queryData: ReviewStatsInputs;
}

export const QueryRepository: FunctionComponent<QueryRepositoryProps> = ({
  queryData,
}) => {
  // const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const apolloClient = useApolloClient();

  const fetchPrs$ = useMemo(() => fetchPrs(apolloClient, queryData), [
    apolloClient,
    queryData,
  ]);

  const pullRequests = useObservable(fetchPrs$);

  useEffect(() => {
    const isLoading = !pullRequests || pullRequests.length === 0;
    setLoading(isLoading);
  }, [pullRequests]);

  if (loading || !pullRequests) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    console.error('Error while fetching the query', error);
    return (
      <div>
        <p>Error!</p>
      </div>
    );
  }

  return (
    <div>
      <MetricPickerWithCharts pullRequests={pullRequests} />
    </div>
  );
};
