import { useSelector } from '@xstate/react';
import React, { useContext } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { AppStateContext } from '../context/AppStateProvider';

const Tax = () => {
	const { rootService } = useContext(AppStateContext);
	const is_restricted = useSelector(
		rootService,
		(state) => state.context.is_restricted
	);
	const location = useLocation();

	if (location.pathname.includes('file')) {
		return <>{is_restricted ? <Navigate to="/records" /> : <Outlet />}</>;
	}
	return <Outlet />;
};

export default Tax;
