export type User = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	access_token?: string;
};

export type UserProfile = {
	first_name: string;
	last_name: string;
	email: string;
	id?: string;
	personal_information: {
		address: string;
		city: string;
		country: string;
		date_of_birth: string;
		first_name: string;
		gender: string;
		id?: string;
		last_name: string;
		postal_code: string;
		province_or_territory: string;
		social_insurrance_number: string;
		telephone: string;
	};
};

export type TaxRecord = {
	id: string;
	user_id: string;
	submitted?: boolean;
	year: string;
	status?: string;
	has_business_expenses: boolean;
	has_rental_expenses: boolean;
	has_employment_expenses: boolean;
	has_motor_vehicle_expenses: boolean;
	has_moving_expenses: boolean;
	business_expenses?: any;
	rental_expenses?: any;
	employment_expenses?: any;
	motor_vehicle_expenses?: any;
	moving_expenses?: any;
};

export type MessageBox = {
	title: string;
	message: string;
};
