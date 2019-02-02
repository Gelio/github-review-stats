import {
  StyleRulesCallback,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';

const styles: StyleRulesCallback<'header'> = (theme) => ({
  header: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

const AppTitle: FunctionComponent<WithStyles<typeof styles>> = ({
  classes,
}) => (
  <Typography variant="h4" className={classes.header}>
    GitHub Review Stats
  </Typography>
);

const StyledAppTitle = withStyles(styles)(AppTitle);
export { StyledAppTitle as AppTitle };
