export const HASURA_MUTATION_SIGNUP_USER = `
mutation signupUser(
    $first_name: String!, 
    $last_name: String!, 
    $email: String!, 
    $password: String!
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
  insert_users_one(object: {
    email: $email, 
    first_name: $first_name,
    last_name: $last_name, 
    password_hash: $password, 
    personal_information: {
      data: {
        address: $address, 
        city: $city, 
        country: $country, 
        date_of_birth: $date_of_birth, 
        first_name: $first_name, 
        gender: $gender, 
        last_name: $last_name, 
        postal_code: $postal_code, 
        social_insurrance_number: $social_insurrance_number, 
        province_or_territory: $province_or_territory, 
        telephone: $telephone
      }
    }
  }) {
    email
    first_name
    id
    last_name
  }
}
`;

export const HASURA_QUERY_LOGIN_USER = `
query loginUser($email: String, $password: String) {
  users(where: {_and: {email: {_eq: $email}, password_hash: {_eq: $password}}}) {
    id
    email
    first_name
    last_name
  }
}
`;

export const HASURA_MUTATION_UPDATE_TAX_SUBMISSION = `
	mutation adminUpdateTaxSubmission($tax_records_id: uuid!) {
		update_tax_records_by_pk(
			pk_columns: { id: $tax_records_id }
			_set: { submitted: true }
		) {
			id
			user_id
			year
			submitted
		}
	}
`;
