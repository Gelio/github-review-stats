import {
  getRepositoriesPermissionsFromScope,
  RepositoriesPermissions,
} from './repositories-permissions';

describe('getRepositoriesPermissionsFromScope', () => {
  it('should parse public repo only scopes', () => {
    const scope = 'public_repo';

    const result = getRepositoriesPermissionsFromScope(scope);

    expect(result).toBe(RepositoriesPermissions.PublicOnly);
  });

  it('should parse public and private repo scopes', () => {
    const scope = 'repo';

    const result = getRepositoriesPermissionsFromScope(scope);

    expect(result).toBe(RepositoriesPermissions.PrivateAndPublic);
  });
});
