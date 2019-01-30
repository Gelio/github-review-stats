const clientId = process.env.REACT_APP_CLIENT_ID;

if (!clientId) {
  console.error(
    'Client ID is not specified. Make sure to fill in the environment variables.',
  );
}

const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
if (!clientSecret) {
  console.error(
    'Client secret is not specified. Make sure to fill in the environment variables.',
  );
}

export const config = {
  GITHUB_API_URL: 'https://api.github.com/',
  GITHUB_CLIENT_ID: clientId,
  GITHUB_CLIENT_SECRET: clientSecret,
};
