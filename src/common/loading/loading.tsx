import * as React from 'react';

export const Loading: React.StatelessComponent = ({ children }) => {
  return <div>{children}</div>;
};

Loading.defaultProps = {
  children: 'Loading...'
};
