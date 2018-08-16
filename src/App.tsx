import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import './App.css';

import { AuthChecker } from './authentication/auth-checker';
import { store } from './store';

class App extends React.Component {
  public render() {
    return (
      <StoreProvider store={store}>
        <AuthChecker>Authenticated</AuthChecker>
      </StoreProvider>
    );
  }
}

export default App;
