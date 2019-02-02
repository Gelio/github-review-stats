# GitHub Review Stats

Visualizes pull request stats for a given repository during a selected period of time.

Allows choosing various metrics:

- total comments left
- the number of PRs a user was involved in
- total lines of code reviewed
- total number of files reviewed

Data is visualized using a bar chart and a pie chart.

## Disclaimer

This project was an experiment. I wanted to try out React Hooks, as well as use Azure Functions for
authentication. I did not focus on code quality, testing and React component architecture.

## Architecture

The project consists of a React web app and an Azure Function.

### Frontend

The `frontend` directory contains a web app that lets the user sign in with their GitHub account and
query for pull request reviews of a chosen repository.

#### Technologies

- `react@16.8.0-alpha-1` (with hooks)
- Apollo Client for interacting with GitHub's GraphQL API
- Recharts for visualizing data using charts
- Material UI as the UI library.

### Azure Function

The only Azure Function created in this project handles exchanging the `code` received after signing
in with GitHub for an `access_token` that lets the user issue requests to GitHub's API.

More information on authenticating with GitHub is available [in GitHub's excellent docs](https://developer.github.com/v3/guides/basics-of-authentication/).

## Author

The author of this project is Grzegorz Rozdzialik.
