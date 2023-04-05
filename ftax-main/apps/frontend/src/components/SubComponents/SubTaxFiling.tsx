import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../context/AppStateProvider';
import { useSelector } from '@xstate/react';
import { useCustomCompare } from '../../utils';

import { Stack, Button, Box, Divider, CircularProgress } from '@mui/material';
import { Save, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import TaxInformationForm from '../Forms/TaxInformationForm';
import BusinessExpensesForm from '../Forms/BusinessExpensesForm';
import RentalExpensesForm from '../Forms/RentalExpensesForm';
import ErrorMessageBox from '../MessageBox/ErrorMessageBox';
import SuccessMessageBox from '../MessageBox/SuccessMessageBox';
import { Link, Navigate } from 'react-router-dom';
import EmploymentExpensesForm from '../Forms/EmploymentExpensesForm';
import MotorVehicleExpensesForm from '../Forms/MotorVehicleExpensesForm';
import MovingExpensesForm from '../Forms/MovingExpensesForm';

const SubTaxFiling = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const {
		isLoading,
		isSaving,
		success,
		error,
		successMessage,
		errorMessage,
		taxRecord,
	} = useSelector(
		rootService,
		(state) => {
			return {
				isSaving: state.matches('logged_in.file_tax_return.saving'),
				isLoading: state.matches('logged_in.file_tax_return.loading'),
				success: state.matches('logged_in.file_tax_return.success'),
				error: state.matches('logged_in.file_tax_return.error'),
				successMessage: state.context.successMessage,
				errorMessage: state.context.errorMessage,
				taxRecord: state.context.taxRecord || null,
			};
		},
		useCustomCompare
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm({ shouldUnregister: true });

	const [
		has_business_expenses,
		has_rental_expenses,
		has_employment_expenses,
		has_motor_vehicle_expenses,
		has_moving_expenses,
		year,
	] = watch([
		'has_business_expenses',
		'has_rental_expenses',
		'has_employment_expenses',
		'has_motor_vehicle_expenses',
		'has_moving_expenses',
		'year',
	]);

	useEffect(() => {
		if (taxRecord) {
			const cleanedRecord = Object.fromEntries(
				Object.entries(taxRecord).filter(([_, v]) => v != null)
			);

			reset(cleanedRecord);
		}
	}, [taxRecord]);

	const onSubmit = (data) => {
		const { year, ...other } = data;
		send('SAVE_TAX', { formData: other });
	};

	if (taxRecord && taxRecord.submitted) {
		return <Navigate to={`/tax/view/${year}`} />;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				<Stack direction="row-reverse" spacing={3}>
					<Button
						size="large"
						variant="contained"
						color="secondary"
						endIcon={isSaving ? <CircularProgress /> : <Save />}
						type="submit">
						Save Tax File
					</Button>
					<Button
						size="large"
						variant="contained"
						color="secondary"
						endIcon={<Visibility />}
						component={Link}
						to={`/tax/view/${year}`}>
						View Tax File
					</Button>
				</Stack>
				<Box>
					<TaxInformationForm
						control={control}
						errors={errors}
						disableYear={true}
					/>
				</Box>

				{has_rental_expenses && (
					<Box>
						<RentalExpensesForm control={control} errors={errors} />
					</Box>
				)}

				{has_business_expenses && (
					<Box>
						<BusinessExpensesForm control={control} errors={errors} />
					</Box>
				)}

				{has_employment_expenses && (
					<Box>
						<EmploymentExpensesForm control={control} errors={errors} />
					</Box>
				)}

				{has_motor_vehicle_expenses && (
					<Box>
						<MotorVehicleExpensesForm control={control} errors={errors} />
					</Box>
				)}

				{has_moving_expenses && (
					<Box>
						<MovingExpensesForm control={control} errors={errors} />
					</Box>
				)}
			</Stack>
		</form>
	);
};

export default SubTaxFiling;
