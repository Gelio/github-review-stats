import { totalCommentsReviewMetric } from './total-comments';
import { ReviewMetric } from './types';

export type MetricKind = 'totalComments';

export const metrics: Record<MetricKind, ReviewMetric> = {
  totalComments: totalCommentsReviewMetric,
};
