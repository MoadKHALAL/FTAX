import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppStateProvider';
import { useSelector } from '@xstate/react';
import { useCustomCompare } from '../../utils';

import { Stack, Button, Box, Divider } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import TaxInformationForm from '../Forms/TaxInformationForm';
import BusinessExpensesForm from '../Forms/BusinessExpensesForm';
import RentalExpensesForm from '../Forms/RentalExpensesForm';
import { useNavigate } from 'react-router-dom';
import ErrorMessageBox from '../MessageBox/ErrorMessageBox';
import EmploymentExpensesForm from '../Forms/EmploymentExpensesForm';
import MotorVehicleExpensesForm from '../Forms/MotorVehicleExpensesForm';
import MovingExpensesForm from '../Forms/MovingExpensesForm';

const SubTaxNew = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const navigate = useNavigate();
	const { isLoading, error, errorMessage } = useSelector(
		rootService,
		(state) => {
			return {
				isLoading: state.matches('logged_in.new_file_tax_return.saving'),
				error: state.matches('logged_in.new_file_tax_return.error'),
				errorMessage: state.context.errorMessage,
			};
		},
		useCustomCompare
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
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

	const onSubmit = (data) => {
		send('SAVE_TAX', {
			formData: data,
			callback: () => navigate(`/tax/file/${year}`),
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
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
						endIcon={<Save />}
						type="submit">
						Save Tax File
					</Button>
				</Stack>
				<Box>
					<TaxInformationForm
						control={control}
						errors={errors}
						disableYear={false}
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

export default SubTaxNew;
