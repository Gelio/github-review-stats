import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { colorPalette } from './color-palette';
import { TransformedReview } from './interfaces';

const styles: StyleRulesCallback<'chartsWrapper'> = (_) => ({
  chartsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
  },
});

const BARS_LIMIT = 10;

interface ChartsOwnProps {
  reviews: TransformedReview[];
}

const Charts: FunctionComponent<WithStyles<typeof styles> & ChartsOwnProps> = ({
  classes,
  reviews,
}) => {
  return (
    <div className={classes.chartsWrapper}>
      <ResponsiveContainer width="80%" aspect={1}>
        <PieChart>
          <Pie
            data={reviews}
            nameKey="name"
            dataKey="count"
            label={true}
            labelLine={true}
          >
            {reviews.map((_, index) => (
              <Cell
                fill={colorPalette[index % colorPalette.length]}
                key={index}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data={reviews.slice(0, BARS_LIMIT)}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="count" fill={colorPalette[0]} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const StyledCharts = withStyles(styles)(Charts);
export { StyledCharts as Charts };
