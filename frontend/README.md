# GitHub Review Stats - frontend

Frontend web app for GitHub Review Stats visualizer.

## Development

First, install the dependencies:

```sh
npm install
```

Then, create a `.env` file in this directory and fill it in with deployment-specific information:

```text
REACT_APP_AZURE_ACCESS_TOKEN_FUNCTION_URL=https://url.here
REACT_APP_GITHUB_CLIENT_ID=ID here
```

You may also want to create `.env.production` with production configuration.

Afterwards, start developing:

```sh
npm run start
```

## Deployment

Run

```sh
npm run deploy
```

to build and publish the project to GitHub Pages.
