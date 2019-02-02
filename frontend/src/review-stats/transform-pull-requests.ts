import { PullRequest, TransformedReview } from './interfaces';

export const transformPullRequests = (
  pullRequests: PullRequest[],
): TransformedReview[] => {
  const reviewsMap: Record<string, number> = {};

  pullRequests.forEach((pr) => {
    pr.reviews.nodes.forEach((review) => {
      reviewsMap[review.author.login] =
        (reviewsMap[review.author.login] || 0) + 1;
    });
  });

  const reviews = Object.entries(reviewsMap).map(
    ([name, count]): TransformedReview => ({
      name,
      count,
    }),
  );
  reviews.sort((a, b) => b.count - a.count);

  return reviews;
};
