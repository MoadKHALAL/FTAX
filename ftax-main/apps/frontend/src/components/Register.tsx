import { useSelector } from '@xstate/react';
import React, { useContext, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppStateContext } from '../context/AppStateProvider';
import { useCustomCompare } from '../utils';

import { useForm, Controller } from 'react-hook-form';
import {
	Box,
	Button,
	Stack,
	Typography,
	TextField,
	Container,
} from '@mui/material';
import PersonalInformationForm from './Forms/PersonalInformationForm';
import LoginCredentialsForm from './Forms/LoginCredentialsForm';
import ErrorMessageBox from './MessageBox/ErrorMessageBox';
import SubPageHeading from './Headings/SubPageHeading';

const Register = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const { isLoggedIn, isLoading, isAuthFailure, authFailure } = useSelector(
		rootService,
		(state) => {
			return {
				isLoggedIn: state.matches('logged_in'),
				isLoading: state.matches('register'),
				isAuthFailure: state.matches('failure'),
				authFailure: state.context.errorMessage,
			};
		},
		useCustomCompare
	);
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			first_name: '',
			last_name: '',
			date_of_birth: '',
			social_insurrance_number: '',
			gender: '',
			address: '',
			city: '',
			postal_code: '',
			province_or_territory: '',
			country: 'Canada',
			telephone: '',
		},
	});

	const onSubmit = (data) => {
		// console.log(data);
		const { confirmPassword, ...other } = data;
		send('REGISTER', {
			formData: other,
			callback: () => navigate('/'),
		});
	};

	if (isLoggedIn) {
		return <Navigate to={'/records'} />;
	}

	return (
		<Box
			sx={{
				position: 'relative',
				py: '3rem',
				backgroundColor: 'primary.main',
			}}>
			<Container>
				<Box
					sx={{
						width: '50%',
						marginX: 'auto',
						padding: '3rem',
						borderRadius: 5,
						boxShadow: 3,
						backgroundColor: 'whitesmoke',
					}}>
					<Stack spacing={3}>
						{isAuthFailure && (
							<ErrorMessageBox
								title={authFailure.title}
								message={authFailure.message}
							/>
						)}
						<Typography
							variant="h3"
							sx={{
								textAlign: 'center',
							}}>
							FTax
						</Typography>
						<Typography
							variant="h5"
							sx={{
								textAlign: 'center',
							}}>
							Register
						</Typography>
						<Box>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Stack spacing={3}>
									<SubPageHeading>Login Credentials</SubPageHeading>
									<LoginCredentialsForm
										control={control}
										errors={errors}
										watch={watch}
										disableEmail={false}
										requirePassword={true}
									/>
									<SubPageHeading>Personal Information</SubPageHeading>
									<PersonalInformationForm
										control={control}
										errors={errors}
										disableDOB={false}
										disableSIN={false}
									/>

									<Button type="submit" variant="contained" color="secondary">
										Sign Up
									</Button>
									<Box>
										Already have an account?{' '}
										<Button
											color="secondary"
											variant="contained"
											to="/login"
											component={Link}>
											Login
										</Button>{' '}
										here
									</Box>
								</Stack>
							</form>
						</Box>
					</Stack>
				</Box>
			</Container>
		</Box>
	);
};

export default Register;
