import { gql } from 'graphql-request';

export const HASURA_QUERY_LOGIN_USER = gql`
	query loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			access_token
			id
			email
			first_name
			last_name
		}
	}
`;

export const HASURA_QUERY_FETCH_USER = gql`
	query getUser {
		users {
			id
			first_name
			last_name
			email
		}
	}
`;

export const HASURA_QUERY_FETCH_USER_PROFILE = gql`
	query getUserProfile($id: uuid!) {
		users_by_pk(id: $id) {
			id
			email
			first_name
			last_name
			personal_information {
				address
				city
				country
				date_of_birth
				first_name
				gender
				id
				last_name
				postal_code
				province_or_territory
				social_insurrance_number
				telephone
			}
		}
	}
`;

export const HASURA_QUERY_FETCH_TAX_RECORD = gql`
	query fetchTaxRecord($year: String!) {
		tax_records(where: { year: { _eq: $year } }, limit: 1) {
			id
			user_id
			submitted
			year
			status
			has_rental_expenses
			has_business_expenses
			has_employment_expenses
			has_motor_vehicle_expenses
			has_moving_expenses
			business_expenses {
				id
				formData
			}
			rental_expenses {
				id
				formData
			}
			employment_expenses {
				id
				formData
			}
			motor_vehicle_expenses {
				id
				formData
			}
			moving_expenses {
				id
				formData
			}
		}
	}
`;

export const HASURA_QUERY_FETCH_ALL_TAX_RECORDS = gql`
	query fetchTaxRecord {
		tax_records {
			id
			user_id
			submitted
			year
			status
			has_rental_expenses
			has_business_expenses
		}
	}
`;

export const HASURA_GRAPHQL_SIGNUP_USER = gql`
	mutation signupUserr(
		$email: String!
		$password: String!
		$first_name: String!
		$last_name: String!
		$gender: String!
		$date_of_birth: String!
		$social_insurrance_number: String!
		$telephone: String!
		$city: String!
		$postal_code: String!
		$province_or_territory: String!
		$country: String!
		$address: String!
	) {
		signupUser(
			email: $email
			first_name: $first_name
			last_name: $last_name
			password: $password
			gender: $gender
			date_of_birth: $date_of_birth
			social_insurrance_number: $social_insurrance_number
			telephone: $telephone
			city: $city
			postal_code: $postal_code
			province_or_territory: $province_or_territory
			country: $country
			address: $address
		) {
			access_token
			email
			first_name
			id
			last_name
		}
	}
`;
