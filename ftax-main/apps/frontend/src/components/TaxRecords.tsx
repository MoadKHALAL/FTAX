import { ArrowCircleRight } from '@mui/icons-material';
import {
	Box,
	CircularProgress,
	Container,
	Stack,
	Button,
	Divider,
	Skeleton,
	Typography,
} from '@mui/material';
import { useSelector } from '@xstate/react';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStateContext } from '../context/AppStateProvider';
import { useCustomCompare } from '../utils';
import PageHeading from './Headings/PageHeading';
import ErrorMessageBox from './MessageBox/ErrorMessageBox';

const Records = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const { isDashboardSate, isLoading, error, errorMessage, taxRecords } =
		useSelector(
			rootService,
			(state) => {
				return {
					isDashboardSate: state.matches('logged_in.dashboard'),
					isLoading:
						state.matches('logged_in.dashboard.loading') ||
						state.matches('logged_in.dashboard.validating'),
					error: state.matches('logged_in.dashboard.error'),
					errorMessage: state.context.errorMessage,
					taxRecords: state.context.taxRecords || null,
				};
			},
			useCustomCompare
		);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isDashboardSate) {
			send('GO_TO_DASHBOARD');
		}
	}, []);

	return (
		<Box>
			<Container>
				<Stack spacing={3}>
					<PageHeading>Tax Records</PageHeading>
					<Divider sx={{ my: '10px' }} />
					{error && (
						<ErrorMessageBox
							title={errorMessage.title}
							message={errorMessage.message}
						/>
					)}
					<Stack direction="row-reverse">
						<Button
							size="large"
							variant="contained"
							color="secondary"
							disabled={error}
							endIcon={<ArrowCircleRight />}
							onClick={() => navigate('/tax/file/new')}>
							New Tax File
						</Button>
					</Stack>
					<Box sx={{ position: 'relative', my: '20px' }}>
						{isLoading ? (
							<Skeleton
								variant="rectangular"
								height={300}
								animation="wave"
								sx={{ borderRadius: 3 }}
							/>
						) : (
							<RecordsGrid taxRecords={taxRecords} navigate={navigate} />
						)}
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};

const RecordsGrid = ({ taxRecords, navigate }) => {
	if (!taxRecords) {
		return <></>;
	}
	return (
		<Box sx={{ py: '1rem' }}>
			<Stack>
				<TableHeader />
				{taxRecords.length === 0 && (
					<Typography
						variant="h5"
						sx={{
							width: '100%',
							textAlign: 'center',
							py: '3rem',
							color: 'rgba(0,0,0,0.4)',
						}}>
						No Records to show
					</Typography>
				)}
				{taxRecords.map((record) => {
					return (
						<TableItem key={record.id} record={record} navigate={navigate} />
					);
				})}
			</Stack>
		</Box>
	);
};

const TableItem = ({ record, navigate }) => {
	return (
		<Stack
			direction="row"
			justifyContent="space-evenly"
			sx={{
				borderBottom: '1px solid rgba(0,0,0,0.1)',
				py: '1rem',
				height: 'auto',
			}}>
			<Item>{record.year}</Item>
			<Item>{record.status}</Item>
			<Item>{record.submitted ? 'Yes' : 'No'}</Item>
			<Box sx={{ width: '100%', p: '0.5rem' }}>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => navigate(`/tax/view/${record.year}`)}>
					View/Edit
				</Button>
			</Box>
		</Stack>
	);
};

const TableHeader = () => {
	return (
		<Stack
			direction="row"
			justifyContent="space-evenly"
			sx={{ borderBottom: '1px solid rgba(0,0,0,0.3)' }}>
			<HeaderItem>Year</HeaderItem>
			<HeaderItem>Status</HeaderItem>
			<HeaderItem>Submitted</HeaderItem>
			<HeaderItem>Manage</HeaderItem>
		</Stack>
	);
};

const Item = ({ children, ...props }) => {
	return (
		<Typography
			variant="body1"
			sx={{
				width: '100%',
				px: '0.5rem',
				my: 'auto',
				overflowWrap: 'anywhere',
			}}
			{...props}>
			{children}
		</Typography>
	);
};

const HeaderItem = ({ children, ...props }) => {
	return (
		<Typography variant="h6" sx={{ width: '100%', p: '0.5rem' }} {...props}>
			{children}
		</Typography>
	);
};

export default Records;
