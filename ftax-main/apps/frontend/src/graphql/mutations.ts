import { gql } from 'graphql-request';

export const HASURA_MUTATION_UPDATE_USER_PROFILE = gql`
	mutation updateUserProfile(
		$id: uuid!
		$personal_information_id: uuid!
		$first_name: String!
		$last_name: String!
		$gender: String!
		$telephone: String!
		$city: String!
		$postal_code: String!
		$province_or_territory: String!
		$address: String!
	) {
		update_users_by_pk(
			pk_columns: { id: $id }
			_set: { last_name: $last_name, first_name: $first_name }
		) {
			email
			first_name
			id
			last_name
		}
		update_personal_information_by_pk(
			pk_columns: { id: $personal_information_id }
			_set: {
				first_name: $first_name
				last_name: $last_name
				gender: $gender
				telephone: $telephone
				city: $city
				postal_code: $postal_code
				province_or_territory: $province_or_territory
				address: $address
			}
		) {
			first_name
			last_name
			address
			city
			country
			date_of_birth
			gender
			id
			postal_code
			province_or_territory
			social_insurrance_number
			telephone
		}
	}
`;

export const HASURA_MUTATION_UPDATE_LOGIN_CREDENTIAL = gql`
	mutation updateLoginCredentials($id: uuid!, $password: String!) {
		update_users_by_pk(
			pk_columns: { id: $id }
			_set: { password_hash: $password }
		) {
			email
			first_name
			last_name
			id
		}
	}
`;

export const HASURA_MUTATION_INSERT_TAX_RECORDS = gql`
	mutation insertTaxRecord(
		$user_id: uuid!
		$year: String!
		$has_business_expenses: Boolean!
		$has_rental_expenses: Boolean!
		$has_employment_expenses: Boolean!
		$has_motor_vehicle_expenses: Boolean!
		$has_moving_expenses: Boolean!
		$business_expenses: jsonb
		$rental_expenses: jsonb
		$employment_expenses: jsonb
		$motor_vehicle_expenses: jsonb
		$moving_expenses: jsonb
	) {
		insert_tax_records_one(
			object: {
				user_id: $user_id
				year: $year
				has_business_expenses: $has_business_expenses
				has_rental_expenses: $has_rental_expenses
				has_employment_expenses: $has_employment_expenses
				has_motor_vehicle_expenses: $has_motor_vehicle_expenses
				has_moving_expenses: $has_moving_expenses
				business_expenses: { data: { formData: $business_expenses } }
				rental_expenses: { data: { formData: $rental_expenses } }
				employment_expenses: { data: { formData: $employment_expenses } }
				motor_vehicle_expenses: { data: { formData: $motor_vehicle_expenses } }
				moving_expenses: { data: { formData: $moving_expenses } }
			}
		) {
			id
			user_id
			submitted
			year
			status
			has_business_expenses
			has_rental_expenses
			has_employment_expenses
			has_motor_vehicle_expenses
			has_moving_expenses
			business_expenses {
				id
				tax_records_id
				formData
			}
			rental_expenses {
				id
				tax_records_id
				formData
			}
			employment_expenses {
				id
				tax_records_id
				formData
			}
			motor_vehicle_expenses {
				id
				tax_records_id
				formData
			}
			moving_expenses {
				id
				tax_records_id
				formData
			}
		}
	}
`;

export const HASURA_MUTATION_UPDATE_TAX_RECORD = gql`
	mutation updateTaxRecord(
		$tax_records_id: uuid!
		$year: String
		$has_business_expenses: Boolean!
		$has_rental_expenses: Boolean!
		$has_employment_expenses: Boolean!
		$has_motor_vehicle_expenses: Boolean!
		$has_moving_expenses: Boolean!
		$business_expenses: jsonb
		$rental_expenses: jsonb
		$employment_expenses: jsonb
		$motor_vehicle_expenses: jsonb
		$moving_expenses: jsonb
	) {
		update_tax_records_by_pk(
			pk_columns: { id: $tax_records_id }
			_set: {
				has_business_expenses: $has_business_expenses
				has_rental_expenses: $has_rental_expenses
				has_employment_expenses: $has_employment_expenses
				has_motor_vehicle_expenses: $has_motor_vehicle_expenses
				has_moving_expenses: $has_moving_expenses
			}
		) {
			id
			user_id
			year
			submitted
			status
			has_business_expenses
			has_rental_expenses
			has_employment_expenses
			has_motor_vehicle_expenses
			has_moving_expenses
		}
		update_business_expenses(
			where: { tax_records_id: { _eq: $tax_records_id } }
			_set: { formData: $business_expenses }
		) {
			affected_rows
			returning {
				id
				tax_records_id
				formData
			}
		}
		update_rental_expenses(
			where: { tax_records_id: { _eq: $tax_records_id } }
			_set: { formData: $rental_expenses }
		) {
			affected_rows
			returning {
				id
				tax_records_id
				formData
			}
		}
		update_employment_expenses(
			where: { tax_records_id: { _eq: $tax_records_id } }
			_set: { formData: $employment_expenses }
		) {
			affected_rows
			returning {
				id
				tax_records_id
				formData
			}
		}
		update_motor_vehicle_expenses(
			where: { tax_records_id: { _eq: $tax_records_id } }
			_set: { formData: $motor_vehicle_expenses }
		) {
			affected_rows
			returning {
				id
				tax_records_id
				formData
			}
		}
		update_moving_expenses(
			where: { tax_records_id: { _eq: $tax_records_id } }
			_set: { formData: $moving_expenses }
		) {
			affected_rows
			returning {
				id
				tax_records_id
				formData
			}
		}
	}
`;

export const HASURA_MUTATION_SUBMIT_TAX_RECORD = gql`
	mutation updateTaxSubmission($tax_records_id: String!) {
		updateTaxSubmission(tax_records_id: $tax_records_id) {
			id
			user_id
			submitted
			year
		}
	}
`;
