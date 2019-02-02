import { ReviewMetric } from './types';

export const filesReviewedReviewMetric: ReviewMetric = (pullRequests) => {
  const reviewsMap: Record<string, number> = {};

  pullRequests.forEach((pr) => {
    const involvedUsers = new Set<string>();

    pr.reviews.nodes.forEach((review) => {
      involvedUsers.add(review.author.login);
    });

    involvedUsers.delete(pr.author.login);

    involvedUsers.forEach((user) => {
      reviewsMap[user] = (reviewsMap[user] || 0) + pr.changedFiles;
    });
  });

  return reviewsMap;
};
