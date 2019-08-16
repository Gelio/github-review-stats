import {
  Button,
  Grid,
  Link,
  Paper,
  StyleRulesCallback,
  Typography,
  WithStyles,
  withStyles,
  Theme,
} from '@material-ui/core';
import React, { FunctionComponent, useCallback } from 'react';
import { connect, DispatchProp, MapStateToProps } from 'react-redux';

import { AppTitle } from '../app-title';
import { authenticationLogout } from '../authentication/actions';
import { StoreState } from '../store';
import { getUserProfileUrl } from './get-user-profile-url';
import { RepositoriesPermissions } from '../authentication/repositories-permissions';
import { EnablePrivateReposButton } from './enable-private-repos-button';

interface StateProps {
  login?: string;
  repositoriesPermissions?: RepositoriesPermissions;
}

const styles: StyleRulesCallback<
  Theme,
  {},
  'main' | 'signOutButton' | 'privateReposInfo'
> = (theme) => ({
  main: {
    width: 'auto',

    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  signOutButton: {
    textAlign: 'right',
  },
  privateReposInfo: {
    marginTop: theme.spacing(1),
  },
});

const UserInfoBar: FunctionComponent<
  StateProps & DispatchProp & WithStyles<typeof styles>
> = ({ login, repositoriesPermissions, dispatch, classes }) => {
  if (!login) {
    throw new Error('Login is required');
  } else if (!repositoriesPermissions) {
    throw new Error('Repositories permissions are required');
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

      <div className={classes.privateReposInfo}>
        {repositoriesPermissions ===
        RepositoriesPermissions.PrivateAndPublic ? (
          <Typography>Access to private repositories is enabled</Typography>
        ) : (
          <>
            <Typography>
              Only access to public repositories is granted.
            </Typography>
            <EnablePrivateReposButton />
          </>
        )}
      </div>
    </Paper>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, StoreState> = ({
  authentication,
}) => ({
  login: authentication.login,
  repositoriesPermissions: authentication.repositoriesPermissions,
});

const ConnectedUserInfoBar = connect(mapStateToProps)(
  withStyles(styles)(UserInfoBar),
);

export { ConnectedUserInfoBar as UserInfoBar };
