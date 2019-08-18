import React, { FunctionComponent } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CircularProgress } from '@material-ui/core';

export const FetchingProgress: FunctionComponent<ProgressBarProps> = (
  props,
) => {
  return (
    <>
      <p>
        Fetching data... <CircularProgress size={20} />
      </p>

      <ProgressBar {...props} />

      {props.variant === 'determinate' && (
        <p>
          Fetched data for {props.fetchedPrs} of {props.totalPrs} Pull Requests.{' '}
        </p>
      )}
    </>
  );
};

type ProgressBarProps =
  | {
      variant: 'determinate';
      fetchedPrs: number;
      totalPrs: number;
    }
  | {
      variant: 'indeterminate';
    };

const ProgressBar: FunctionComponent<ProgressBarProps> = (props) => {
  if (props.variant === 'determinate') {
    const percentageCompleted =
      props.totalPrs === 0 ? 100 : (props.fetchedPrs / props.totalPrs) * 100;

    return <LinearProgress variant="determinate" value={percentageCompleted} />;
  }

  return <LinearProgress variant="indeterminate" />;
};
