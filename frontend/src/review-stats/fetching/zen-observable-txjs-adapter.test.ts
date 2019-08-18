import Observable from 'zen-observable';

import { zenObservableToRxJs } from './zen-observable-rxjs-adapter';

const runAllPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('zenObservableToRxJs', () => {
  it('should emit the same values as the underlying observable', async () => {
    const originalObservable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      subscriber.complete();
    });

    const rxjsObservable = zenObservableToRxJs(originalObservable);
    const subscriber = jest.fn();

    const subscription = rxjsObservable.subscribe(subscriber);

    await runAllPromises();

    expect(subscriber).toHaveBeenNthCalledWith(1, 1);
    expect(subscriber).toHaveBeenNthCalledWith(2, 2);
    expect(subscriber).toHaveBeenNthCalledWith(3, 3);
    expect(subscriber).toHaveBeenNthCalledWith(4, 4);

    subscription.unsubscribe();
  });

  it('should complete as the underlying observable completes', async () => {
    const originalObservable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.complete();
    });

    const rxjsObservable = zenObservableToRxJs(originalObservable);
    const subscriber = jest.fn();
    const onComplete = jest.fn();

    const subscription = rxjsObservable.subscribe(
      subscriber,
      () => null,
      onComplete,
    );

    await runAllPromises();

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(subscription.closed).toBe(true);
  });

  it('should error as the underlying observable errors', async () => {
    const error = new Error('Test');
    const originalObservable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.error(error);
    });

    const rxjsObservable = zenObservableToRxJs(originalObservable);
    const onNext = jest.fn();
    const onError = jest.fn();
    const onComplete = jest.fn();

    const subscription = rxjsObservable.subscribe(onNext, onError, onComplete);

    await runAllPromises();

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(error);
    expect(subscription.closed).toBe(true);
  });
});
