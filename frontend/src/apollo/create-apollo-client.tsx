import ApolloClient from 'apollo-boost';

export function createApolloClient(accessToken: string) {
  return new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
}
