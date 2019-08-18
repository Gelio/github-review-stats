import { format } from 'date-fns';

import { ReviewStatsInputs } from '../types';

const formatGitHubDateTime = (date: Date) =>
  [format(date, 'yyyy-MM-dd'), 'T', format(date, 'HH:mm:ss'), 'Z'].join('');

const createDateRange = (fromDate: Date, toDate: Date) =>
  `${formatGitHubDateTime(fromDate)}..${formatGitHubDateTime(toDate)}`;

export const createSearchQueryString = (queryData: ReviewStatsInputs) =>
  `type:pr repo:${queryData.repository} updated:${createDateRange(
    queryData.fromDate,
    queryData.toDate,
  )} sort:updated-desc`;
