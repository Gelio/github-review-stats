import { ObservableQuery, ApolloQueryResult } from 'apollo-boost';

import ZenObservable from 'zen-observable';
/**
 * Allows using `zen-observable` operators on an observable
 * TODO: remove after upgrading to `apollo-client@2.6.8`
 * @see https://github.com/apollographql/apollo-client/issues/3721
 */
export function normalizeObservableQuery<T>(
  observableQuery: ObservableQuery<T>,
) {
  return ZenObservable.from((observableQuery as unknown) as ZenObservable<
    ApolloQueryResult<T>
  >);
}
