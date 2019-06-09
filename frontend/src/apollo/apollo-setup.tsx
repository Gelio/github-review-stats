import React, { FunctionComponent, useMemo } from 'react';
import { ApolloProvider } from 'react-apollo';
import { connect, MapStateToProps } from 'react-redux';

import { StoreState } from '../store';
import { createApolloClient } from './create-apollo-client';

interface StateProps {
  accessToken?: string;
}

const ApolloSetup: FunctionComponent<StateProps> = ({
  accessToken,
  children,
}) => {
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

const mapStateToProps: MapStateToProps<StateProps, {}, StoreState> = ({
  authentication,
}) => ({
  accessToken: authentication.accessToken,
});

const ConnectedApolloSetup = connect(mapStateToProps)(ApolloSetup);
export { ConnectedApolloSetup as ApolloSetup };
