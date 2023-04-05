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

const RentalExpensesForm = ({ control, errors }) => {
	return (
		<Stack spacing={3} sx={{ borderRadius: 3, boxShadow: 5, p: 5 }}>
			<SubPageHeading>Rental Expenses</SubPageHeading>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="rental_expenses.date_began"
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
										error={errors.rental_expenses?.date_began ? true : false}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
				<Controller
					name="rental_expenses.date_ended"
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
										error={errors.rental_expenses?.date_ended ? true : false}
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
					name="rental_expenses.ownership_percent"
					defaultValue={''}
					control={control}
					rules={{ required: false, min: 0, max: 100 }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Ownership Percentage (%)'}
							error={errors.rental_expenses?.ownership_percent ? true : false}
							helperText={
								errors.rental_expenses?.ownership_percent
									? 'Between 0 and 100'
									: ''
							}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="rental_expenses.personal_usage_percent"
					defaultValue={''}
					control={control}
					rules={{ required: false, min: 0, max: 100 }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Personal usage Percentage (%)'}
							error={
								errors.rental_expenses?.personal_usage_percent ? true : false
							}
							helperText={
								errors.rental_expenses?.personal_usage_percent
									? 'Between 0 and 100'
									: ''
							}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="rental_expenses.gst_number"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'GST Number'}
							error={errors.rental_expenses?.gst_number ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="rental_expenses.prepare_gst"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={errors.rental_expenses?.prepare_gst ? true : false}>
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
									label="Prepare GST?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="rental_expenses.property_taxes"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Property Taxes'}
							error={errors.rental_expenses?.property_taxes ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="rental_expenses.utilities"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Utilities'}
							error={errors.rental_expenses?.utilities ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="rental_expenses.travel"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Travel'}
							error={errors.rental_expenses?.travel ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="rental_expenses.insurance"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Insurance'}
							error={errors.rental_expenses?.insurance ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="rental_expenses.other_expenses"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Other Expenses'}
							error={errors.rental_expenses?.other_expenses ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="rental_expenses.additional_info_or_comments"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Additional Info or Comments'}
							error={
								errors.rental_expenses?.additional_info_or_comments
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

export default RentalExpensesForm;
