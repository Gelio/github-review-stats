import {
  Button,
  Paper,
  StyleRulesCallback,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React, { StatelessComponent } from 'react';

import { config } from '../config';

const styles: StyleRulesCallback<'main' | 'paper' | 'header'> = (theme) => ({
  main: {
    width: 'auto',

    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  header: {
    marginBottom: 5,
  },
});

const AuthenticationPage: StatelessComponent<WithStyles<typeof styles>> = ({
  classes,
}) => {
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.header}>
          GitHub review stats
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={onAuthenticationButtonClick}
        >
          Sign up with GitHub
        </Button>
      </Paper>
    </main>
  );
};

const onAuthenticationButtonClick = () => {
  const redirectUrl = window.location.href;
  const queryParams = [
    `client_id=${config.githubClientID}`,
    `redirect_uri=${redirectUrl}`,
  ].join('&');

  window.location.href = `https://github.com/login/oauth/authorize?${queryParams}`;
};

const StyledAuthenticationPage = withStyles(styles)(AuthenticationPage);
export { StyledAuthenticationPage as AuthenticationPage };
