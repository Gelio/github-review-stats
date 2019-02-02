import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import React, { Component } from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { ApolloSetup } from './apollo/apollo-setup';
import { AuthChecker } from './authentication/auth-checker';
import { ReviewStats } from './review-stats/review-stats';
import { store } from './store';
import { UserInfoBar } from './user-info-bar/user-info-bar';

class App extends Component {
  public render() {
    return (
      <>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <StoreProvider store={store}>
            <AuthChecker>
              <ApolloSetup>
                <UserInfoBar />

                <ReviewStats />
              </ApolloSetup>
            </AuthChecker>
          </StoreProvider>
        </MuiPickersUtilsProvider>
      </>
    );
  }
}

export default App;
