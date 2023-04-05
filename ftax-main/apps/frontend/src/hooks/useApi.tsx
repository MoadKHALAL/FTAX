import { GraphQLClient } from 'graphql-request';
import { getAuthToken } from '../utils';

export default (credentials = true) => {
	const endpoint = process.env.REACT_APP_HASURA_GRAPHQL_API_URL;
	const client = new GraphQLClient(endpoint);

	if (credentials) {
		client.setHeader('Authorization', `Bearer ${getAuthToken()}`);
	}
	return client;
};
