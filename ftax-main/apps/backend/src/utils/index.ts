import fetchh from 'node-fetch';
import config from '../config.js';
import { HASURA_API_RETURN_TYPE } from '../types/index.js';

export const callHasura = async (variables, query: string) => {
	const fetchResponse = await fetchh(config.HASURA_URL, {
		method: 'POST',
		body: JSON.stringify({
			query: query,
			variables,
		}),
		headers: {
			'x-hasura-admin-secret': config.HASURA_ADMIN_SECRET,
		},
	});
	const data: HASURA_API_RETURN_TYPE =
		(await fetchResponse.json()) as HASURA_API_RETURN_TYPE;
	return data;
};
