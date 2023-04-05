import express from 'express';
import jwt from 'jsonwebtoken';

import {
	LoginUserArgs,
	LoginUserOutput,
	SignupUserArgs,
	SignupUserOutput,
} from '../types/Auth.js';
import {
	HASURA_MUTATION_SIGNUP_USER,
	HASURA_QUERY_LOGIN_USER,
} from '../graphql/index.js';
import { callHasura } from '../utils/index.js';
import config from '../config.js';

const router = express.Router();

router.post('/signupUser', async (req, res) => {
	const params: SignupUserArgs = req.body.input;
	const response = await callHasura(params, HASURA_MUTATION_SIGNUP_USER);

	const data = response.data?.insert_users_one as SignupUserOutput;
	const errors = response.errors;

	if (errors) return res.status(400).json(errors[0]);

	const token = await jwt.sign(
		{
			'https://hasura.io/jwt/claims': {
				'x-hasura-allowed-roles': ['user'],
				'x-hasura-default-role': 'user',
				'x-hasura-user-id': data.id,
			},
		},
		config.HASURA_JWT_SECRET,
		{ algorithm: config.HASURA_JWT_ALGO, expiresIn: '1d' }
	);
	data.access_token = token;

	return res.json(data);
});

router.post('/loginUser', async (req, res) => {
	const params: LoginUserArgs = req.body.input;
	const response = await callHasura(params, HASURA_QUERY_LOGIN_USER);

	if (response.data && response.data.users.length === 0) {
		return res.status(404).json({
			message: 'USER_NOT_FOUND',
		});
	}
	const data = response.data?.users[0] as LoginUserOutput;
	const errors = response.errors;

	if (errors) return res.status(400).json(errors);

	const token = await jwt.sign(
		{
			'https://hasura.io/jwt/claims': {
				'x-hasura-allowed-roles': ['user'],
				'x-hasura-default-role': 'user',
				'x-hasura-user-id': data.id,
			},
		},
		config.HASURA_JWT_SECRET,
		{ algorithm: config.HASURA_JWT_ALGO, expiresIn: '3h' }
	);
	data.access_token = token;
	return res.json(data);
});

export default router;
