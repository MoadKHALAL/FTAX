import React from 'react';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Stack,
	TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import SubPageHeading from '../Headings/SubPageHeading';

const MotorVehicleExpensesForm = ({ control, errors }) => {
	return (
		<Stack spacing={3} sx={{ borderRadius: 3, boxShadow: 5, p: 5 }}>
			<SubPageHeading>Motor Vehicle Expenses</SubPageHeading>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="motor_vehicle_expenses.date_began"
					defaultValue={''}
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								{...field}
								label={'Date Began'}
								renderInput={(params) => (
									<TextField
										{...params}
										error={
											errors.motor_vehicle_expenses?.date_began ? true : false
										}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.date_ended"
					defaultValue={''}
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								{...field}
								label={'Date Ended'}
								renderInput={(params) => (
									<TextField
										{...params}
										error={
											errors.motor_vehicle_expenses?.date_ended ? true : false
										}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="motor_vehicle_expenses.opening_km"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Opening Km'}
							error={errors.motor_vehicle_expenses?.opening_km ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.closing_km"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Closing Km'}
							error={errors.motor_vehicle_expenses?.closing_km ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="motor_vehicle_expenses.fuel_and_oil"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Fuel and Oil'}
							error={errors.motor_vehicle_expenses?.fuel_and_oil ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.maintainence_and_repairs"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Maintainence and Repairs'}
							error={
								errors.motor_vehicle_expenses?.maintainence_and_repairs
									? true
									: false
							}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.insurance_and_licensing"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Insurance and Licensing'}
							error={
								errors.motor_vehicle_expenses?.insurance_and_licensing
									? true
									: false
							}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="motor_vehicle_expenses.is_owner"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={errors.motor_vehicle_expenses?.is_owner ? true : false}>
							<FormGroup sx={{ width: '100%', mt: '6px' }}>
								<FormControlLabel
									control={
										<Checkbox
											name={field.name}
											ref={field.ref}
											onBlur={field.onBlur}
											onChange={(e) => {
												field.onChange(e.target.checked ? 'Yes' : 'No');
											}}
											value={field.value === 'Yes' ? true : false}
											checked={field.value === 'Yes' ? true : false}
										/>
									}
									label="Is Owner?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.is_first_year_owned_use"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={
								errors.motor_vehicle_expenses?.is_first_year_owned_use
									? true
									: false
							}>
							<FormGroup sx={{ width: '100%', mt: '6px' }}>
								<FormControlLabel
									control={
										<Checkbox
											name={field.name}
											ref={field.ref}
											onBlur={field.onBlur}
											onChange={(e) => {
												field.onChange(e.target.checked ? 'Yes' : 'No');
											}}
											value={field.value === 'Yes' ? true : false}
											checked={field.value === 'Yes' ? true : false}
										/>
									}
									label="Is First Year Owned Use?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.is_leased"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={errors.motor_vehicle_expenses?.is_leased ? true : false}>
							<FormGroup sx={{ width: '100%', mt: '6px' }}>
								<FormControlLabel
									control={
										<Checkbox
											name={field.name}
											ref={field.ref}
											onBlur={field.onBlur}
											onChange={(e) => {
												field.onChange(e.target.checked ? 'Yes' : 'No');
											}}
											value={field.value === 'Yes' ? true : false}
											checked={field.value === 'Yes' ? true : false}
										/>
									}
									label="Is Leased?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.is_first_year_lease_use"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={
								errors.motor_vehicle_expenses?.is_first_year_lease_use
									? true
									: false
							}>
							<FormGroup sx={{ width: '100%', mt: '6px' }}>
								<FormControlLabel
									control={
										<Checkbox
											name={field.name}
											ref={field.ref}
											onBlur={field.onBlur}
											onChange={(e) => {
												field.onChange(e.target.checked ? 'Yes' : 'No');
											}}
											value={field.value === 'Yes' ? true : false}
											checked={field.value === 'Yes' ? true : false}
										/>
									}
									label="Is First Year Lease Use?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="motor_vehicle_expenses.fair_market_value"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Fair Market Value'}
							error={
								errors.motor_vehicle_expenses?.fair_market_value ? true : false
							}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="motor_vehicle_expenses.other_expenses"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Other Expenses'}
							error={
								errors.motor_vehicle_expenses?.other_expenses ? true : false
							}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="motor_vehicle_expenses.additional_info_or_comments"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Additional Info or Comments'}
							error={
								errors.motor_vehicle_expenses?.additional_info_or_comments
									? true
									: false
							}
							fullWidth
						/>
					)}
				/>
			</Stack>
		</Stack>
	);
};

export default MotorVehicleExpensesForm;
