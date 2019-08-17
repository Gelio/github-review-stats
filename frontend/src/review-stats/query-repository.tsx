import { CircularProgress } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useApolloClient } from 'react-apollo';

import { ReviewStatsInputs, PullRequest } from './types';
import { MetricPickerWithCharts } from './metric-picker-with-charts';
import { fetchPrs } from './fetching/fetch-prs';

interface QueryRepositoryProps {
  queryData: ReviewStatsInputs;
}

export const QueryRepository: FunctionComponent<QueryRepositoryProps> = ({
  queryData,
}) => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apolloClient = useApolloClient();

  useEffect(() => {
    fetchPrs(apolloClient, queryData)
      .then(setPullRequests)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [apolloClient, queryData]);

  if (loading) {
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

  console.log(pullRequests);

  return (
    <div>
      <MetricPickerWithCharts pullRequests={pullRequests} />
    </div>
  );
};
