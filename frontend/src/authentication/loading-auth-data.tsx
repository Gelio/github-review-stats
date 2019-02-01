import { CircularProgress, withStyles } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/core/styles';
import React, { StatelessComponent } from 'react';

const styles: StyleRules<'wrapper'> = {
  wrapper: {
    width: '100%',
    textAlign: 'center',
    marginTop: 50,
  },
};

const LoadingAuthData: StatelessComponent<WithStyles<typeof styles>> = ({
  classes,
}) => {
  return (
    <div className={classes.wrapper}>
      <CircularProgress size={50} />
    </div>
  );
};

const StyledLoadingAuthData = withStyles(styles)(LoadingAuthData);
export { StyledLoadingAuthData as LoadingAuthData };
