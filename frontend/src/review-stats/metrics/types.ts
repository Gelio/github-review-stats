import { PullRequest } from '../types';

export type ReviewMetric = (
  pullRequests: PullRequest[],
) => Record<string, number>;
