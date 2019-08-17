import React, { FunctionComponent, useMemo } from 'react';
import { ApolloProvider } from 'react-apollo';
import { useSelector } from 'react-redux';

import { StoreState } from '../store';
import { createApolloClient } from './create-apollo-client';

const accessTokenSelector = (state: StoreState) =>
  state.authentication.accessToken;

export const ApolloSetup: FunctionComponent = ({ children }) => {
  const accessToken = useSelector(accessTokenSelector);

  if (!accessToken) {
    throw new Error(
      `${ApolloSetup.displayName} should be rendered only if the user is logged in.`,
    );
  }

  const apolloClient = useMemo(() => createApolloClient(accessToken), [
    accessToken,
  ]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
