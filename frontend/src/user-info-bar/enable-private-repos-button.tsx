import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';

import { getGithubAuthenticationUrl } from '../authentication/get-github-authentication-url';
import { RepositoriesPermissions } from '../authentication/repositories-permissions';

export const EnablePrivateReposButton: FunctionComponent = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      href={getGithubAuthenticationUrl(
        RepositoriesPermissions.PrivateAndPublic,
      )}
    >
      Enable private repos
    </Button>
  );
};
