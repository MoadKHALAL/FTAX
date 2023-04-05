import { sleep } from '../utils';
import { RootMachineContext } from '../state/state.types';
import useApi from '../hooks/useApi';
import {
	HASURA_QUERY_FETCH_USER,
	HASURA_GRAPHQL_SIGNUP_USER,
	HASURA_QUERY_LOGIN_USER,
	HASURA_QUERY_FETCH_USER_PROFILE,
	HASURA_QUERY_FETCH_TAX_RECORD,
	HASURA_QUERY_FETCH_ALL_TAX_RECORDS,
} from '../graphql/queries';
import { TaxRecord, User, UserProfile } from '../types';
import {
	HASURA_MUTATION_INSERT_TAX_RECORDS,
	HASURA_MUTATION_SUBMIT_TAX_RECORD,
	HASURA_MUTATION_UPDATE_LOGIN_CREDENTIAL,
	HASURA_MUTATION_UPDATE_TAX_RECORD,
	HASURA_MUTATION_UPDATE_USER_PROFILE,
} from '../graphql/mutations';

// async functions for backend
export const fetchUser = async (context: RootMachineContext, event) => {
	const api = useApi();
	try {
		const res = await api.request<{ users: any }>(HASURA_QUERY_FETCH_USER);
		return {
			user: {
				id: res.users[0].id,
				first_name: res.users[0].first_name,
				last_name: res.users[0].last_name,
				email: res.users[0].email,
			},
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const loginUser = async (context: RootMachineContext, event) => {
	const api = useApi(false);
	try {
		const { loginUser } = await api.request<{ loginUser: User }>(
			HASURA_QUERY_LOGIN_USER,
			{
				email: event.email,
				password: event.password,
			}
		);
		return {
			user: {
				id: loginUser.id,
				first_name: loginUser.first_name,
				last_name: loginUser.last_name,
				email: loginUser.email,
			},
			jwt_token: loginUser.access_token,
			callback: event.callback,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const signupUser = async (context: RootMachineContext, event) => {
	const api = useApi(false);
	try {
		const { signupUser } = await api.request<{ signupUser: any }>(
			HASURA_GRAPHQL_SIGNUP_USER,
			event.formData
		);
		return {
			user: {
				id: signupUser.id,
				first_name: signupUser.first_name,
				last_name: signupUser.last_name,
				email: signupUser.email,
			},
			jwt_token: signupUser.access_token,
			callback: event.callback,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const validateUserInfo = async () => {
	// throw new Error('not valid payment');
	return {
		is_restricted: false,
	};
};

export const fetchUserTaxData = async () => {
	// throw new Error('error occured while fetching data')
	await sleep(5000);
	return {
		tax_data: [
			{
				year: '2019',
			},
			{
				year: '2020',
			},
		],
	};
};

export const fetchUserProfileData = async (
	context: RootMachineContext,
	event
) => {
	const api = useApi();
	try {
		const { users_by_pk } = await api.request<{ users_by_pk: UserProfile }>(
			HASURA_QUERY_FETCH_USER_PROFILE,
			{
				id: context.user.id,
			}
		);

		return {
			userProfile: users_by_pk,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const updateUserProfileData = async (
	context: RootMachineContext,
	event
) => {
	const api = useApi();
	try {
		let response;
		switch (event.eventType) {
			case 'UPDATE_PERSONAL_INFORMATION':
				response = await api.request<{
					update_users_by_pk: any;
					update_personal_information_by_pk: any;
				}>(HASURA_MUTATION_UPDATE_USER_PROFILE, {
					personal_information_id: context.userProfile.personal_information.id,
					id: context.userProfile.id,
					...event.formData,
				});

				return {
					user: response.update_users_by_pk,
					userProfile: {
						...response.update_users_by_pk,
						personal_information: {
							...response.update_personal_information_by_pk,
						},
					},
				};
			case 'UPDATE_LOGIN_CREDENTIALS':
				response = await api.request<{
					update_users_by_pk: any;
				}>(HASURA_MUTATION_UPDATE_LOGIN_CREDENTIAL, {
					id: context.user.id,
					...event.formData,
				});

				return {
					user: response.update_users_by_pk,
					userProfile: context.userProfile,
				};
		}
	} catch (err) {
		return Promise.reject(err);
	}
};

export const insertTaxRecord = async (context: RootMachineContext, event) => {
	const api = useApi();

	try {
		const { tax_records } = await api.request<{ tax_records: TaxRecord[] }>(
			HASURA_QUERY_FETCH_TAX_RECORD,
			{ year: event.formData.year }
		);

		if (tax_records.length !== 0) {
			throw new Error('Error: Tax Record with the year already exists');
		}

		const { insert_tax_records_one } = await api.request<{
			insert_tax_records_one: TaxRecord;
		}>(HASURA_MUTATION_INSERT_TAX_RECORDS, {
			user_id: context.user.id,
			...event.formData,
		});

		const cleanedTaxRecord: TaxRecord = {
			...insert_tax_records_one,
			business_expenses: insert_tax_records_one.business_expenses.formData,
			rental_expenses: insert_tax_records_one.rental_expenses.formData,
			employment_expenses: insert_tax_records_one.employment_expenses.formData,
			motor_vehicle_expenses:
				insert_tax_records_one.motor_vehicle_expenses.formData,
			moving_expenses: insert_tax_records_one.moving_expenses.formData,
		};

		return {
			taxRecord: cleanedTaxRecord,
			callback: event.callback,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const fetchTaxRecord = async (context: RootMachineContext, event) => {
	const api = useApi();

	try {
		const { tax_records } = await api.request<{
			tax_records: TaxRecord[];
		}>(HASURA_QUERY_FETCH_TAX_RECORD, {
			year: event.year,
		});

		const tax_record = tax_records[0];

		if (tax_records.length === 0) {
			throw new Error('Error: No Record Exists');
		}

		const cleanedTaxRecord: TaxRecord = {
			...tax_record,
			business_expenses: tax_record.business_expenses.formData,
			rental_expenses: tax_record.rental_expenses.formData,
			employment_expenses: tax_record.employment_expenses.formData,
			motor_vehicle_expenses: tax_record.motor_vehicle_expenses.formData,
			moving_expenses: tax_record.moving_expenses.formData,
		};

		return {
			taxRecord: cleanedTaxRecord,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const updateTaxRecord = async (context: RootMachineContext, event) => {
	const api = useApi();

	try {
		const {
			update_tax_records_by_pk,
			update_business_expenses,
			update_rental_expenses,
			update_employment_expenses,
			update_motor_vehicle_expenses,
			update_moving_expenses,
		} = await api.request<{
			update_tax_records_by_pk: any;
			update_business_expenses: any;
			update_rental_expenses: any;
			update_employment_expenses: any;
			update_motor_vehicle_expenses: any;
			update_moving_expenses: any;
		}>(HASURA_MUTATION_UPDATE_TAX_RECORD, {
			tax_records_id: context.taxRecord.id,
			...event.formData,
		});

		const cleanedRecord: TaxRecord = {
			...update_tax_records_by_pk,
			business_expenses: update_business_expenses.returning[0].formData,
			rental_expenses: update_rental_expenses.returning[0].formData,
			employment_expenses: update_employment_expenses.returning[0].formData,
			motor_vehicle_expenses:
				update_motor_vehicle_expenses.returning[0].formData,
			moving_expenses: update_moving_expenses.returning[0].formData,
		};

		return {
			taxRecord: cleanedRecord,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const fetchAllTaxRecords = async (
	context: RootMachineContext,
	event
) => {
	const api = useApi();

	try {
		const { tax_records } = await api.request<{
			tax_records: TaxRecord[];
		}>(HASURA_QUERY_FETCH_ALL_TAX_RECORDS);

		return {
			taxRecords: tax_records,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export const submitTaxRecord = async (context: RootMachineContext, event) => {
	const api = useApi();

	try {
		const { updateTaxSubmission } = await api.request<{
			updateTaxSubmission: TaxRecord;
		}>(HASURA_MUTATION_SUBMIT_TAX_RECORD, {
			tax_records_id: context.taxRecord.id,
		});

		return {
			taxRecord: updateTaxSubmission,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};
