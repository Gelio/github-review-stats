import { filesReviewedReviewMetric } from './files-reviewed';
import { linesOfCodeReviewedReviewMetric } from './lines-of-code-reviewed';
import { prsInteractedWithReviewMetric } from './prs-interacted-with';
import { totalCommentsReviewMetric } from './total-comments';
import { ReviewMetric } from './types';

export type MetricKind =
  | 'totalComments'
  | 'prsInteractedWith'
  | 'linesOfCodeReviewed'
  | 'filesReviewed';

export const metrics: Record<MetricKind, ReviewMetric> = {
  totalComments: totalCommentsReviewMetric,
  prsInteractedWith: prsInteractedWithReviewMetric,
  linesOfCodeReviewed: linesOfCodeReviewedReviewMetric,
  filesReviewed: filesReviewedReviewMetric,
};
