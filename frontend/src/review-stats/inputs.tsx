import {
  Button,
  InputAdornment,
  StyleRulesCallback,
  TextField,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { subDays } from 'date-fns/esm';
import { DateTimePicker } from 'material-ui-pickers';
import React, { FunctionComponent, useCallback, useState } from 'react';

import { ReviewStatsInputs } from './interfaces';

const styles: StyleRulesCallback<'input' | 'withMarginLeft'> = (theme) => ({
  input: {
    marginBottom: theme.spacing.unit * 2,
  },
  withMarginLeft: {
    marginLeft: theme.spacing.unit,
  },
});

interface InputsProps {
  onQuery: (inputs: ReviewStatsInputs) => void;
}

const Inputs: FunctionComponent<WithStyles<typeof styles> & InputsProps> = ({
  classes,
  onQuery,
}) => {
  const [repository, setRepository] = useState(
    'Gelio/tslint-import-group-ordering',
  );
  const onRepositoryInputChange: NonNullable<TextFieldProps['onChange']> = (
    event,
  ) => {
    setRepository(event.target.value);
  };

  const [fromDate, setFromDate] = useState(subDays(new Date(), 7));
  const [toDate, setToDate] = useState(new Date());
  const onQueryButtonClick = useCallback(
    () =>
      onQuery({
        repository,
        fromDate,
        toDate,
      }),
    [onQuery, repository, fromDate, toDate],
  );

  return (
    <>
      <TextField
        label="Repository"
        value={repository}
        onChange={onRepositoryInputChange}
        className={classes.input}
        fullWidth={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              https://github.com/
            </InputAdornment>
          ),
        }}
      />

      <div>
        <DateTimePicker
          value={fromDate}
          onChange={setFromDate}
          label="From"
          disableFuture={true}
          className={classes.input}
        />
        <DateTimePicker
          value={toDate}
          onChange={setToDate}
          label="To"
          disableFuture={true}
          className={`${classes.input} ${classes.withMarginLeft}`}
        />
      </div>

      <Button variant="contained" color="primary" onClick={onQueryButtonClick}>
        Query
      </Button>
    </>
  );
};

const StyledInputs = withStyles(styles)(Inputs);
export { StyledInputs as Inputs };
