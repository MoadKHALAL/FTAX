import express from 'express';
import { HASURA_MUTATION_UPDATE_TAX_SUBMISSION } from '../graphql/index.js';
import { callHasura } from '../utils/index.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
	const params = req.body.input;
	const response = await callHasura(
		params,
		HASURA_MUTATION_UPDATE_TAX_SUBMISSION
	);

	const data = response.data?.update_tax_records_by_pk;
	const errors = response.errors;

	if (errors) return res.status(400).json(errors[0]);

	return res.json(data);
});

export default router;
