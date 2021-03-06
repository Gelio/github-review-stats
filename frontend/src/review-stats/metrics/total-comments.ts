import { ReviewMetric } from './types';

export const totalCommentsReviewMetric: ReviewMetric = (pullRequests) => {
  const reviewsMap: Record<string, number> = {};

  pullRequests.forEach((pr) => {
    pr.reviews.nodes
      .filter((review) => review.author.login !== pr.author.login)
      .forEach((review) => {
        reviewsMap[review.author.login] =
          (reviewsMap[review.author.login] || 0) + review.comments.totalCount;
      });
  });

  return reviewsMap;
};
