const azureAccessTokenFunctionUrl =
  process.env.REACT_APP_AZURE_ACCESS_TOKEN_FUNCTION_URL;

if (!azureAccessTokenFunctionUrl) {
  // tslint:disable-next-line:no-console
  console.error(
    'REACT_APP_AZURE_ACCESS_TOKEN_FUNCTION_URL environment variable not set.',
  );
}

export const config = {
  githubClientID: 'c671c642cc5094466c10',
  azureAccessTokenFunctionUrl: azureAccessTokenFunctionUrl as string,
};
