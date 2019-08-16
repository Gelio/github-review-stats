import {
  StyleRulesCallback,
  Typography,
  withStyles,
  WithStyles,
  Theme,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';

const styles: StyleRulesCallback<Theme, {}, 'header'> = (theme) => ({
  header: {
    marginBottom: theme.spacing(2),
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
