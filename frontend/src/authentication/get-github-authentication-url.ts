import { config } from '../config';
import { RepositoriesPermissions } from './repositories-permissions';

export const getGithubAuthenticationUrl = (
  repositoriesPermissions: RepositoriesPermissions,
) => {
  const redirectUrl = window.location.href;
  const queryParams = [
    `client_id=${config.githubClientID}`,
    `redirect_uri=${redirectUrl}`,
    `scope=${getScopeBasedOnPermissions(repositoriesPermissions)}`,
  ].join('&');

  return `https://github.com/login/oauth/authorize?${queryParams}`;
};

function getScopeBasedOnPermissions(
  repositoriesPermissions: RepositoriesPermissions,
) {
  switch (repositoriesPermissions) {
    case RepositoriesPermissions.PublicOnly:
      return 'public_repo';

    case RepositoriesPermissions.PrivateAndPublic:
      return 'repo';
  }

  throw new Error(
    `Invalid repositories permissions: ${repositoriesPermissions}`,
  );
}
