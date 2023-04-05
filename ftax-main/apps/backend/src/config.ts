import dotenv from 'dotenv'
dotenv.config()

export default {
	HASURA_URL: process.env.HASURA_URL,
	HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
	HASURA_JWT_ALGO: process.env.HASURA_JWT_ALGO,
	HASURA_JWT_SECRET: process.env.HASURA_JWT_SECRET,
};
