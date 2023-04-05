import { Box, CircularProgress } from '@mui/material';
import { useSelector } from '@xstate/react';
import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AppStateContext } from '../context/AppStateProvider';
import { useCustomCompare } from '../utils';
import AppNavbar from './AppNavbar';

const Dashboard = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const navigate = useNavigate();
	const { isLoggedOut, isLoading, isAuthFailure } = useSelector(
		rootService,
		(state) => {
			return {
				isLoggedOut: state.matches('logged_out'),
				isLoading: state.matches('loading'),
				isAuthFailure: state.matches('failure'),
			};
		},
		useCustomCompare
	);

	if (isLoggedOut || isAuthFailure) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			{isLoading ? (
				<CircularProgress
					size={68}
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						zIndex: 1,
					}}
				/>
			) : (
				<Box>
					<AppNavbar />
					<Outlet />
					<Box sx={{ height: '100px', mt: '30px' }}></Box>
				</Box>
			)}
		</>
	);
};

export default Dashboard;
