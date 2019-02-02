import {
  Paper,
  StyleRulesCallback,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';

import { Inputs } from './inputs';
import { ReviewStatsInputs } from './interfaces';
import { QueryRepository } from './query-repository';

const styles: StyleRulesCallback<'main' | 'input' | 'withMarginLeft'> = (
  theme,
) => ({
  main: {
    width: 'auto',
    display: 'block',

    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,

    padding: theme.spacing.unit * 2,

    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.width('lg') - theme.spacing.unit * 2 * 2,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  input: {
    marginBottom: theme.spacing.unit * 2,
  },
  withMarginLeft: {
    marginLeft: theme.spacing.unit,
  },
});

const ReviewStats: FunctionComponent<WithStyles<typeof styles>> = ({
  classes,
}) => {
  const [queryData, setQueryData] = useState<ReviewStatsInputs | null>(null);

  return (
    <Paper className={classes.main}>
      <Inputs onQuery={setQueryData} />

      {queryData && <QueryRepository queryData={queryData} />}
    </Paper>
  );
};

const StyledReviewStats = withStyles(styles)(ReviewStats);
export { StyledReviewStats as ReviewStats };
