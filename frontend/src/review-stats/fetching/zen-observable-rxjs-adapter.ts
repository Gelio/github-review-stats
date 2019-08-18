import { Observable } from 'rxjs';

import ZenObservable from 'zen-observable';

/**
 * Adapts a Zen Observable to an RxJS observable
 * @param zenObservable
 */
export const zenObservableToRxJs = <T>(zenObservable: ZenObservable<T>) =>
  new Observable<T>((subscriber) => {
    const subscription = zenObservable.subscribe({
      next: (val) => subscriber.next(val),
      complete: () => subscriber.complete(),
      error: (err) => subscriber.error(err),
    });

    return () => {
      if (!subscription.closed) {
        subscription.unsubscribe();
      }
    };
  });
