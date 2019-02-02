import React, { FunctionComponent, useEffect, useState } from 'react';
import { Dispatch } from 'redux';

import { LoadingAuthData } from './loading-auth-data';
import { verifyUserAuthenticated } from './verify-user-authenticated';

interface AuthenticationVerifierProps {
  accessToken: string;
  dispatch: Dispatch;
}

export const AuthenticationVerifier: FunctionComponent<
  AuthenticationVerifierProps
> = (props) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(false);

    verifyUserAuthenticated(props.dispatch, fetch, props.accessToken).then(() =>
      setInitialized(true),
    );
  }, [props.accessToken]);

  if (initialized) {
    return <>{props.children}</>;
  }

  return <LoadingAuthData />;
};
