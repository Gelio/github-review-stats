import { PullRequest, TransformedReview } from './interfaces';
import { ReviewMetric } from './metrics/types';

export const transformPullRequests = (
  pullRequests: PullRequest[],
  reviewMetric: ReviewMetric,
): TransformedReview[] => {
  const reviewsMap = reviewMetric(pullRequests);

  const reviews = Object.entries(reviewsMap).map(
    ([name, count]): TransformedReview => ({
      name,
      count,
    }),
  );
  reviews.sort((a, b) => b.count - a.count);

  return reviews;
};
