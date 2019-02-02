import { CircularProgress } from '@material-ui/core';
import { format } from 'date-fns/esm';
import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';

import { Charts } from './charts';
import { ReviewStatsInputs } from './interfaces';
import { transformPullRequests } from './transform-pull-requests';

const GET_REPOSITORY_INFO_QUERY = gql`
  query GetRepositoryInfo(
    $firstPrs: Int!
    $firstReviews: Int!
    $query: String!
  ) {
    search(first: $firstPrs, type: ISSUE, query: $query) {
      nodes {
        ... on PullRequest {
          number
          permalink
          title
          updatedAt
          changedFiles
          additions
          deletions
          author {
            login
          }
          reviews(first: $firstReviews) {
            nodes {
              author {
                login
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
    }
  }
`;

interface QueryRepositoryProps {
  queryData: ReviewStatsInputs;
}

export const QueryRepository: FunctionComponent<QueryRepositoryProps> = ({
  queryData,
}) => {
  const queryVariables = {
    firstPrs: 50,
    firstReviews: 50,
    query: createSearchQueryString(queryData),
  };

  return (
    <div>
      <Query query={GET_REPOSITORY_INFO_QUERY} variables={queryVariables}>
        {({ loading, error, data }) => {
          if (loading) {
            return <CircularProgress />;
          }
          if (error) {
            console.error('Error while fetching the query', error);
            return 'Error!';
          }

          const pullRequests = data.search.nodes;
          const reviews = transformPullRequests(pullRequests);

          return <Charts reviews={reviews} />;
        }}
      </Query>
    </div>
  );
};

const formatGitHubDateTime = (date: Date) =>
  [format(date, 'yyyy-MM-dd'), 'T', format(date, 'HH:mm:ss'), 'Z'].join('');

const createSearchQueryString = (queryData: ReviewStatsInputs) =>
  `type:pr repo:${queryData.repository} updated:${formatGitHubDateTime(
    queryData.fromDate,
  )}..${formatGitHubDateTime(queryData.toDate)} sort:updated-desc`;
