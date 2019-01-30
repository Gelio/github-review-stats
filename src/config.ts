const clientId = process.env.REACT_APP_CLIENT_ID;

if (!clientId) {
  // tslint:disable-next-line:no-console
  console.error(
    'Client ID is not specified. Make sure to fill in the environment variables.',
  );
}

const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
if (!clientSecret) {
  // tslint:disable-next-line:no-console
  console.error(
    'Client secret is not specified. Make sure to fill in the environment variables.',
  );
}

export const config = {
  githubClientID: clientId,
  githubClientSecret: clientSecret,
};
