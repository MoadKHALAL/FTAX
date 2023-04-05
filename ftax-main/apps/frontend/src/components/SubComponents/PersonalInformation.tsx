import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../context/AppStateProvider';
import { useSelector } from '@xstate/react';
import { useCustomCompare } from '../../utils';

import { useForm } from 'react-hook-form';
import { UserProfile } from '../../types';
import PersonalInformationForm from '../Forms/PersonalInformationForm';

import { Stack, Button, Box, CircularProgress, Skeleton } from '@mui/material';
import { Save } from '@mui/icons-material';
import SubPageHeading from '../Headings/SubPageHeading';

const PersonalInformation = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const {
		isLoading,
		userProfile,
	}: { isLoading: boolean; userProfile: UserProfile } = useSelector(
		rootService,
		(state) => {
			return {
				isLoading:
					state.matches('logged_in.update_profile.loading') ||
					state.matches('logged_in.update_profile.updating'),
				userProfile: state.context.userProfile || null,
			};
		},
		useCustomCompare
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
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

	useEffect(() => {
		if (userProfile) {
			const { id, ...otherProfileInfo } = userProfile.personal_information;
			reset({
				first_name: userProfile.first_name,
				last_name: userProfile.last_name,
				...otherProfileInfo,
			});
		}
	}, [userProfile]);

	const onSubmit = (data) => {
		const { date_of_birth, social_insurrance_number, country, ...other } = data;

		send('UPDATE_USER_INFO', {
			eventType: 'UPDATE_PERSONAL_INFORMATION',
			formData: other,
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
					<SubPageHeading>Personal Information</SubPageHeading>
					<Button
						size="large"
						variant="contained"
						color="secondary"
						endIcon={isLoading ? <CircularProgress /> : <Save />}
						type="submit">
						Update
					</Button>
				</Stack>
				<Box>
					{isLoading ? (
						<Skeleton
							variant="rectangular"
							height={300}
							animation="wave"
							sx={{ borderRadius: 3 }}
						/>
					) : (
						<Box>
							<PersonalInformationForm
								control={control}
								errors={errors}
								disableDOB={true}
								disableSIN={true}
							/>
						</Box>
					)}
				</Box>
			</form>
		</Stack>
	);
};

export default PersonalInformation;
