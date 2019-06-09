import {
  Button,
  CircularProgress,
  Paper,
  StyleRulesCallback,
  Typography,
  withStyles,
  WithStyles,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { AppTitle } from '../app-title';
import { StoreState } from '../store';
import { getGithubAuthenticationUrl } from './get-github-authentication-url';
import { RepositoriesPermissions } from './repositories-permissions';

const styles: StyleRulesCallback<'main' | 'paper' | 'loadingWrapper'> = (
  theme,
) => ({
  main: {
    width: 'auto',

    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3,
    )}px`,
  },
  loadingWrapper: {
    textAlign: 'center',
  },
});

interface AuthenticationPageStateProps {
  isLoading: boolean;
  hasError: boolean;
}

type AuthenticationPageProps = WithStyles<typeof styles> &
  AuthenticationPageStateProps;

const AuthenticationPage: FunctionComponent<AuthenticationPageProps> = ({
  classes,
  isLoading,
  hasError,
}) => {
  const [accessToPrivateReposEnabled, setAccessToPrivateRepos] = useState(true);

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <AppTitle />

        {isLoading && (
          <div className={classes.loadingWrapper}>
            <Typography gutterBottom={true}>Signing in...</Typography>
            <CircularProgress />
          </div>
        )}

        {hasError && (
          <Typography gutterBottom={true} color="error">
            An error occurred while signing in. Please try again.
          </Typography>
        )}

        {!isLoading && (
          <>
            <Button
              variant="contained"
              color="primary"
              href={getGithubAuthenticationUrl(
                accessToPrivateReposEnabled
                  ? RepositoriesPermissions.PrivateAndPublic
                  : RepositoriesPermissions.PublicOnly,
              )}
            >
              Sign up with GitHub
            </Button>

            <FormControlLabel
              control={
                <Checkbox
                  checked={accessToPrivateReposEnabled}
                  onChange={() =>
                    setAccessToPrivateRepos(!accessToPrivateReposEnabled)
                  }
                />
              }
              label="Enable access to private repos"
            />
          </>
        )}
      </Paper>
    </main>
  );
};

const mapStateToProps: MapStateToProps<
  AuthenticationPageStateProps,
  {},
  StoreState
> = (state) => ({
  isLoading: state.authentication.isLoading,
  hasError: state.authentication.hasError,
});

const ConnectedAuthenticationPage = connect(mapStateToProps)(
  withStyles(styles)(AuthenticationPage),
);
export { ConnectedAuthenticationPage as AuthenticationPage };
