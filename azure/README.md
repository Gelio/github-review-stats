# Azure functions for GitHub Review Stats visualizer

A `retrieveAccessToken` function has been exposed to retrieve user's `access_token` without exposing
GitHub OAuth App's client secret.

## Development

Create a `local.setttings.json` file with the following contents:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "GITHUB_CLIENT_ID": "id here",
    "GITHUB_CLIENT_SECRET": "secret here"
  }
}
```

It is recommended to use VSCode's [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
extension to develop functions and test them locally.

## Deployment

In progress...