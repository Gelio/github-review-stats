import {
  Button,
  Grid,
  Link,
  Paper,
  StyleRulesCallback,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React, { FunctionComponent, useCallback } from 'react';
import { connect, DispatchProp, MapStateToProps } from 'react-redux';

import { AppTitle } from '../app-title';
import { authenticationLogout } from '../authentication/actions';
import { StoreState } from '../store';
import { getUserProfileUrl } from './get-user-profile-url';

interface StateProps {
  login?: string;
}

const styles: StyleRulesCallback<'main' | 'signOutButton'> = (theme) => ({
  main: {
    width: 'auto',

    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  signOutButton: {
    textAlign: 'right',
  },
});

const UserInfoBar: FunctionComponent<
  StateProps & DispatchProp & WithStyles<typeof styles>
> = ({ login, dispatch, classes }) => {
  if (!login) {
    throw new Error('Login is required');
  }

  const signOut = useCallback(() => {
    dispatch(authenticationLogout());
  }, [dispatch]);

  return (
    <Paper className={classes.main}>
      <AppTitle />

      <Grid container={true} alignItems="center">
        <Grid item={true} xs={8}>
          <Typography>
            Signed in as{' '}
            <Link href={getUserProfileUrl(login)}>
              <strong>{login}</strong>
            </Link>
          </Typography>
        </Grid>

        <Grid item={true} xs={4} className={classes.signOutButton}>
          <Button onClick={signOut} variant="contained">
            Sign out
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, StoreState> = ({
  authentication,
}) => ({
  login: authentication.login,
});

const ConnectedUserInfoBar = connect(mapStateToProps)(
  withStyles(styles)(UserInfoBar),
);

export { ConnectedUserInfoBar as UserInfoBar };
