import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Select, { SelectProps } from '@material-ui/core/Select';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Charts } from './charts';
import { PullRequest } from './interfaces';
import { MetricKind, metrics } from './metrics';
import { transformPullRequests } from './transform-pull-requests';

export const MetricPickerWithCharts: FunctionComponent<{
  pullRequests: PullRequest[];
}> = ({ pullRequests }) => {
  const [metricKind, setMetricKind] = useState('totalComments' as MetricKind);
  const reviews = useMemo(
    () => transformPullRequests(pullRequests, metrics[metricKind]),
    [metricKind, pullRequests],
  );

  const onMetricSelectChange = useCallback<
    NonNullable<SelectProps['onChange']>
  >(
    (event) => {
      setMetricKind(event.target.value as MetricKind);
    },
    [setMetricKind],
  );

  return (
    <>
      <FormControl style={{ marginTop: 10 }}>
        <InputLabel htmlFor="metric">Metric</InputLabel>
        <Select
          value={metricKind}
          onChange={onMetricSelectChange}
          inputProps={{ name: 'metric', id: 'metric' }}
        >
          <MenuItem value={'totalComments' as MetricKind}>
            Total comments
          </MenuItem>
          <MenuItem value={'prsInteractedWith' as MetricKind}>
            PRs interacted with
          </MenuItem>
          <MenuItem value={'linesOfCodeReviewed' as MetricKind}>
            Lines of code reviewed
          </MenuItem>
          <MenuItem value={'filesReviewed' as MetricKind}>
            Files reviewed
          </MenuItem>
        </Select>
      </FormControl>

      <Charts reviews={reviews} />
    </>
  );
};
