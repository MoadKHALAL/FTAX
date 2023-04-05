type uuid = string;

export type SignupUserOutput = {
	email: string;
	first_name: string;
	id: uuid;
	access_token?: string;
	last_name: string;
};

export type SignupUserArgs = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
};

export type LoginUserArgs = {
	email: string;
	password: string;
};

export type LoginUserOutput = {
	email: string;
	first_name: string;
	id: uuid;
	access_token?: string;
	last_name: string;
};
