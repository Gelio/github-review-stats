import { CssBaseline } from '@material-ui/core';
import React, { Component } from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { ApolloSetup } from './apollo/apollo-setup';
import { AuthChecker } from './authentication/auth-checker';
import { store } from './store';
import { UserInfoBar } from './user-info-bar/user-info-bar';

class App extends Component {
  public render() {
    return (
      <>
        <CssBaseline />
        <StoreProvider store={store}>
          <AuthChecker>
            <ApolloSetup>
              <UserInfoBar />
            </ApolloSetup>
          </AuthChecker>
        </StoreProvider>
      </>
    );
  }
}

export default App;
