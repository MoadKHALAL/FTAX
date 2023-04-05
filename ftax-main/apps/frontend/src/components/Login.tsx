import { useSelector } from '@xstate/react';
import React, { useContext } from 'react';
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
import ErrorMessageBox from './MessageBox/ErrorMessageBox';

const Login = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const { isLoggedIn, isLoading, isAuthFailure, authFailure } = useSelector(
		rootService,
		(state) => {
			return {
				isLoggedIn: state.matches('logged_in'),
				isLoading: state.matches('logging_in'),
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
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const onSubmit = (data) => {
		send('LOG_IN', {
			email: data.email,
			password: data.password,
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
				backgroundColor: 'primary.main',
				height: '100vh',
			}}>
			<Container>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						minWidth: '400px',
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
							Login
						</Typography>
						<Box>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Stack spacing={2}>
									<Controller
										name="email"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<TextField
												{...field}
												type="email"
												label={'Email'}
												error={errors.email ? true : false}
											/>
										)}
									/>
									<Controller
										name="password"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<TextField
												{...field}
												type="text"
												label={'Password'}
												error={errors.password ? true : false}
											/>
										)}
									/>
									<Button type="submit" variant="contained" color="secondary">
										Log In
									</Button>
									<Box>
										Don&apos;t have an account?{' '}
										<Button
											color="secondary"
											variant="contained"
											to="/register"
											component={Link}>
											Register
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

export default Login;
