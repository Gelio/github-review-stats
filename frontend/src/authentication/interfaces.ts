export interface AuthenticationState {
  isLoading: boolean;
  hasError: boolean;
  accessToken: string | null;
}
