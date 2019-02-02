import { CssBaseline } from '@material-ui/core';
import React, { Component } from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { ApolloSetup } from './apollo/apollo-setup';
import { AuthChecker } from './authentication/auth-checker';
import { store } from './store';

class App extends Component {
  public render() {
    return (
      <>
        <CssBaseline />
        <StoreProvider store={store}>
          <AuthChecker>
            <ApolloSetup>
              <div>Authenticated</div>
            </ApolloSetup>
          </AuthChecker>
        </StoreProvider>
      </>
    );
  }
}

export default App;
