import { assign, createMachine } from 'xstate';
import {
	fetchUser,
	fetchUserTaxData,
	signupUser,
	loginUser,
	validateUserInfo,
	fetchUserProfileData,
	updateUserProfileData,
	insertTaxRecord,
	fetchTaxRecord,
	updateTaxRecord,
	fetchAllTaxRecords,
	submitTaxRecord,
} from '../api';
import { isAuthTokenPresent, removeAuthToken, setAuthToken } from '../utils';
import { RootMachineContext } from './state.types';

export const createRootMachine = () => {
	return createMachine<RootMachineContext>({
		id: 'root',
		initial: 'logged_out',
		context: {
			user: undefined,
			userProfile: undefined,
			is_restricted: true,
			taxRecord: undefined,
			taxRecords: undefined,
			errorMessage: {
				title: 'Something went wrong',
				message: 'Please try again',
			},
			successMessage: {
				title: '',
				message: '',
			},
		},
		states: {
			logged_out: {
				always: {
					target: 'loading',
					cond: isAuthTokenPresent,
				},
				on: {
					LOG_IN: 'logging_in',
					REGISTER: 'register',
				},
			},
			loading: {
				invoke: {
					src: fetchUser,
					onDone: {
						target: 'logged_in',
						actions: assign((context, event) => {
							return {
								user: event.data.user,
							};
						}),
					},
					onError: {
						target: 'failure',
					},
				},
			},
			failure: {
				on: {
					LOG_IN: 'logging_in',
					REGISTER: 'register',
				},
			},
			logging_in: {
				invoke: {
					src: loginUser,
					onDone: {
						target: 'logged_in',
						actions: assign((context, event) => {
							setAuthToken(event.data.jwt_token);
							event.data.callback();
							return {
								user: event.data.user,
							};
						}),
					},
					onError: {
						target: 'failure',
					},
				},
			},
			logged_in: {
				id: 'logged_in',
				on: {
					LOG_OUT: {
						target: 'logged_out',
						actions: assign((context, event) => {
							removeAuthToken();
							event.callback();
							return {
								user: undefined,
							};
						}),
					},
					PROFILE_SETTINGS: {
						target: '.update_profile',
					},
					GO_TO_DASHBOARD: {
						target: '.dashboard',
					},
					VIEW_TAX: { target: '.view_tax_return' },
					NEW_FILE_TAX: { target: '.new_file_tax_return' },
					FILE_TAX: { target: '.file_tax_return' },
				},
				initial: 'dashboard',
				states: {
					dashboard: {
						initial: 'loading',
						states: {
							loading: {
								invoke: {
									src: fetchAllTaxRecords,
									onDone: {
										target: 'validating',
										actions: assign((context, event) => {
											return {
												taxRecords: event.data.taxRecords,
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							validating: {
								invoke: {
									src: validateUserInfo,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											return {
												is_restricted: event.data.is_restricted,
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							success: {},
							error: {},
						},
					},
					update_profile: {
						initial: 'loading',
						on: {
							UPDATE_USER_INFO: {
								target: '.updating',
							},
						},
						states: {
							loading: {
								invoke: {
									src: fetchUserProfileData,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											return {
												userProfile: event.data.userProfile,
												successMessage: {
													title: 'Loaded',
													message:
														'Profile Information was loaded successfully',
												},
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							success: {},
							updating: {
								invoke: {
									src: updateUserProfileData,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											return {
												user: event.data.user,
												userProfile: event.data.userProfile,
												successMessage: {
													title: 'Updated',
													message:
														'Profile Information was updated successfully',
												},
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							error: {},
						},
					},
					view_tax_return: {
						on: {
							SUBMIT_TAX: '.submitting',
						},
						initial: 'loading',
						states: {
							loading: {
								invoke: {
									src: fetchTaxRecord,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											return {
												taxRecord: event.data.taxRecord,
												successMessage: {
													title: 'Loaded',
													message: 'Tax Record was successfully fetched',
												},
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							success: {},
							submitting: {
								invoke: {
									src: submitTaxRecord,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											return {
												taxRecord: {
													...context.taxRecord,
													...event.data.taxRecord,
												},
												successMessage: {
													title: 'Submitted',
													message: 'Tax Record was successfully submitted',
												},
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							error: {},
						},
					},
					file_tax_return: {
						on: {
							SAVE_TAX: '.saving',
						},
						initial: 'loading',
						states: {
							loading: {
								invoke: {
									src: fetchTaxRecord,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											return {
												taxRecord: event.data.taxRecord,
												successMessage: {
													title: 'Loaded',
													message: 'Tax Record was successfully fetched',
												},
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							success: {},
							saving: {
								invoke: {
									src: updateTaxRecord,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											return {
												taxRecord: event.data.taxRecord,
												successMessage: {
													title: 'Saved',
													message: 'Tax Record was saved successfully',
												},
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							error: {},
						},
					},
					new_file_tax_return: {
						on: {
							SAVE_TAX: '.saving',
						},
						initial: 'success',
						states: {
							success: {},
							saving: {
								invoke: {
									src: insertTaxRecord,
									onDone: {
										target: 'success',
										actions: assign((context, event) => {
											event.data.callback();
											return {
												taxRecord: event.data.taxRecord,
											};
										}),
									},
									onError: {
										target: 'error',
									},
								},
							},
							error: {},
						},
					},
				},
			},
			register: {
				invoke: {
					src: signupUser,
					onDone: {
						target: 'logged_in',
						actions: assign((context, event) => {
							setAuthToken(event.data.jwt_token);
							event.data.callback();
							return {
								user: event.data.user,
							};
						}),
					},
					onError: {
						target: 'failure',
					},
				},
			},
		},
	});
};
