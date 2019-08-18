import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>) => {
  const [state, setState] = useState<T | null>(null);

  useEffect(() => {
    setState(null);

    const subscription = observable.subscribe((newValue) => setState(newValue));

    return () => subscription.unsubscribe();
  }, [observable]);

  return state;
};
