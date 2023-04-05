import { Box, Stack, Button, Skeleton, CircularProgress } from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStateContext } from '../../context/AppStateProvider';
import { useSelector } from '@xstate/react';
import { calculateTaxRecordCost, useCustomCompare } from '../../utils';
import SuccessMessageBox from '../MessageBox/SuccessMessageBox';
import ErrorMessageBox from '../MessageBox/ErrorMessageBox';
import TaxInformation from '../DisplayData/TaxInformation';
import RentalExpenses from '../DisplayData/RentalExpenses';
import BusinessExpenses from '../DisplayData/BusinessExpenses';
import SubmitTaxDialog from '../Dialogs/SubmitTaxDialog';
import EmploymentExpenses from '../DisplayData/EmploymentExpenses';
import MotorVehicleExpenses from '../DisplayData/MotorVehicleExpenses';
import MovingExpenses from '../DisplayData/MovingExpenses';

const SubTaxView = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const {
		isLoading,
		isSubmitting,
		success,
		successMessage,
		error,
		errorMessage,
		isRestricted,
		taxRecord,
	} = useSelector(
		rootService,
		(state) => {
			return {
				isLoading: state.matches('logged_in.view_tax_return.loading'),
				isSubmitting: state.matches('logged_in.view_tax_return.submitting'),
				success: state.matches('logged_in.view_tax_return.success'),
				successMessage: state.context.successMessage,
				error: state.matches('logged_in.view_tax_return.error'),
				errorMessage: state.context.errorMessage,
				isRestricted: state.context.is_restricted,
				taxRecord: state.context.taxRecord || null,
			};
		},
		useCustomCompare
	);

	const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

	const handleOpen = () => setOpenSubmitDialog(true);
	const handleClose = () => setOpenSubmitDialog(false);
	const handleSubmitOnDialog = () => {
		send('SUBMIT_TAX');
		handleClose();
	};

	const navigate = useNavigate();

	return (
		<Stack spacing={3}>
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
			{isLoading && (
				<>
					<Skeleton variant="rectangular" />
					<Skeleton variant="rectangular" />
					<Skeleton variant="rectangular" />
					<Skeleton variant="rectangular" />
				</>
			)}
			{success && (
				<>
					<Stack direction="row-reverse" spacing={3}>
						<Button
							size="large"
							variant="contained"
							color="secondary"
							endIcon={<Save />}
							disabled={isRestricted || taxRecord.submitted}
							onClick={handleOpen}>
							Submit Tax File
						</Button>
						<Button
							size="large"
							variant="contained"
							color="secondary"
							disabled={isRestricted || taxRecord.submitted}
							endIcon={isSubmitting ? <CircularProgress /> : <Edit />}
							onClick={() => navigate(`/tax/file/${taxRecord.year}`)}>
							Edit Tax File
						</Button>
					</Stack>

					<TaxInformation taxRecord={taxRecord} />

					{taxRecord.has_rental_expenses && (
						<RentalExpenses rental_expenses={taxRecord.rental_expenses} />
					)}

					{taxRecord.has_business_expenses && (
						<BusinessExpenses business_expenses={taxRecord.business_expenses} />
					)}

					{taxRecord.has_employment_expenses && (
						<EmploymentExpenses
							employment_expenses={taxRecord.employment_expenses}
						/>
					)}

					{taxRecord.has_motor_vehicle_expenses && (
						<MotorVehicleExpenses
							motor_vehicle_expenses={taxRecord.motor_vehicle_expenses}
						/>
					)}

					{taxRecord.has_moving_expenses && (
						<MovingExpenses moving_expenses={taxRecord.moving_expenses} />
					)}

					<SubmitTaxDialog
						id="submit-dialog"
						keepMounted
						open={openSubmitDialog}
						onClose={handleClose}
						handleSubmit={handleSubmitOnDialog}
						value={calculateTaxRecordCost(taxRecord)}
					/>
				</>
			)}
		</Stack>
	);
};

export default SubTaxView;
