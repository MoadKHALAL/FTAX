import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../context/AppStateProvider';
import { useSelector } from '@xstate/react';
import { useCustomCompare } from '../../utils';

import { useForm } from 'react-hook-form';
import { User, UserProfile } from '../../types';

import { Stack, Button, Box, CircularProgress, Skeleton } from '@mui/material';
import { Save } from '@mui/icons-material';
import SubPageHeading from '../Headings/SubPageHeading';
import LoginCredentialsForm from '../Forms/LoginCredentialsForm';

const UpdateLoginCredentials = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const {
		isLoading,
		userProfile,
		user,
	}: { isLoading: boolean; userProfile: UserProfile; user: User } = useSelector(
		rootService,
		(state) => {
			return {
				isLoading:
					state.matches('logged_in.update_profile.loading') ||
					state.matches('logged_in.update_profile.updating'),
				userProfile: state.context.userProfile || null,
				user: state.context.user || null,
			};
		},
		useCustomCompare
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	useEffect(() => {
		if (userProfile) {
			reset({
				email: userProfile.email,
				password: '',
				confirmPassword: '',
			});
		}
	}, [userProfile, user]);

	const onSubmit = (data) => {
		const { password, ...other } = data;
		send('UPDATE_USER_INFO', {
			eventType: 'UPDATE_LOGIN_CREDENTIALS',
			formData: { password },
		});
	};

	return (
		<Stack spacing={3}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack
					spacing={3}
					direction="row"
					justifyContent="space-between"
					alignItems="center">
					<SubPageHeading>Login Credentials</SubPageHeading>
					<Button
						size="large"
						variant="contained"
						color="secondary"
						endIcon={isLoading ? <CircularProgress /> : <Save />}
						type="submit">
						Update
					</Button>
				</Stack>
				<Box sx={{ position: 'relative' }}>
					{isLoading ? (
						<Skeleton
							variant="rectangular"
							height={300}
							animation="wave"
							sx={{ borderRadius: 3 }}
						/>
					) : (
						<Box>
							<LoginCredentialsForm
								control={control}
								errors={errors}
								watch={watch}
								disableEmail={true}
								requirePassword={true}
							/>
						</Box>
					)}
				</Box>
			</form>
		</Stack>
	);
};

export default UpdateLoginCredentials;
