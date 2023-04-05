import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../context/AppStateProvider';

import { Box, Container, Stack, Divider } from '@mui/material';
import PageHeading from './Headings/PageHeading';
import PersonalInformation from './SubComponents/PersonalInformation';
import UpdateLoginCredentials from './SubComponents/UpdateLoginCredentials';
import { useSelector } from '@xstate/react';
import { useCustomCompare } from '../utils';
import SuccessMessageBox from './MessageBox/SuccessMessageBox';
import ErrorMessageBox from './MessageBox/ErrorMessageBox';

const UserProfileSettings = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const { error, errorMessage, success, successMessage } = useSelector(
		rootService,
		(state) => {
			return {
				error: state.matches('logged_in.update_profile.error'),
				errorMessage: state.context.errorMessage,
				success: state.matches('logged_in.update_profile.success'),
				successMessage: state.context.successMessage,
			};
		},
		useCustomCompare
	);

	useEffect(() => {
		send('PROFILE_SETTINGS');
	}, []);

	return (
		<Box>
			<Container>
				<Stack spacing={3}>
					<PageHeading>Profile</PageHeading>
					<Divider />
					{success && (
						<SuccessMessageBox
							title={successMessage.title}
							message={successMessage.message}
						/>
					)}
					{error && (
						<ErrorMessageBox
							title={errorMessage.title}
							message={errorMessage.message}
						/>
					)}
					<Box>
						<PersonalInformation />
					</Box>
					<Divider />
					<Box>
						<UpdateLoginCredentials />
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};

export default UserProfileSettings;
