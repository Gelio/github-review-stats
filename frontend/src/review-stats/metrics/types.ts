import { PullRequest } from '../interfaces';

export type ReviewMetric = (
  pullRequests: PullRequest[],
) => Record<string, number>;
