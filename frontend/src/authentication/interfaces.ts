import { RepositoriesPermissions } from './repositories-permissions';

export interface AuthenticationState {
  isLoading: boolean;
  hasError: boolean;
  accessToken?: string;
  repositoriesPermissions?: RepositoriesPermissions;
  login?: string;
}
