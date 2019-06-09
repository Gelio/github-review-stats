export enum RepositoriesPermissions {
  PublicOnly = 'PUBLIC_ONLY',
  PrivateAndPublic = 'PRIVATE_AND_PUBLIC',
}

export function getRepositoriesPermissionsFromScope(scope: string) {
  const scopes = scope.split(',');
  if (scopes.includes('repo')) {
    return RepositoriesPermissions.PrivateAndPublic;
  } else if (scopes.includes('public_repo')) {
    return RepositoriesPermissions.PublicOnly;
  }

  console.error('Repository scope not found in', scope);
  throw new Error('Repository scope not found');
}
