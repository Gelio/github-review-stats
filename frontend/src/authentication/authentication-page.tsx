import {
  Button,
  CircularProgress,
  Paper,
  StyleRulesCallback,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React, { StatelessComponent } from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { AppTitle } from '../app-title';
import { config } from '../config';
import { StoreState } from '../store';

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

const AuthenticationPage: StatelessComponent<AuthenticationPageProps> = ({
  classes,
  isLoading,
  hasError,
}) => {
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
          <Button
            variant="contained"
            color="primary"
            href={getGithubAuthenticationUrl()}
          >
            Sign up with GitHub
          </Button>
        )}
      </Paper>
    </main>
  );
};

const getGithubAuthenticationUrl = () => {
  const redirectUrl = window.location.href;
  const queryParams = [
    `client_id=${config.githubClientID}`,
    `redirect_uri=${redirectUrl}`,
    'scope=public_repo',
  ].join('&');

  return `https://github.com/login/oauth/authorize?${queryParams}`;
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
