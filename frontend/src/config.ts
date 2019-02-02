const azureAccessTokenFunctionUrl =
  process.env.REACT_APP_AZURE_ACCESS_TOKEN_FUNCTION_URL;

if (!azureAccessTokenFunctionUrl) {
  console.error(
    'REACT_APP_AZURE_ACCESS_TOKEN_FUNCTION_URL environment variable is not set.',
  );
}

const githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;

if (!githubClientID) {
  console.error('REACT_APP_GITHUB_CLIENT_ID environment variable is not set.');
}

export const config = {
  githubClientID: githubClientID as string,
  azureAccessTokenFunctionUrl: azureAccessTokenFunctionUrl as string,
};
