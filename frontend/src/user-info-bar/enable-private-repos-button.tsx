import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';

import { config } from '../config';

export const EnablePrivateReposButton: FunctionComponent = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      href={getGithubAuthenticationUrl()}
    >
      Enable private repos
    </Button>
  );
};

const getGithubAuthenticationUrl = () => {
  const redirectUrl = window.location.href;
  const queryParams = [
    `client_id=${config.githubClientID}`,
    `redirect_uri=${redirectUrl}`,
    'scope=repo',
  ].join('&');

  return `https://github.com/login/oauth/authorize?${queryParams}`;
};
