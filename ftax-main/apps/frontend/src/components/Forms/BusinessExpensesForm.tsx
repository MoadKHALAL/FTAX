import React from 'react';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Stack,
	Switch,
	TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import SubPageHeading from '../Headings/SubPageHeading';
import { IMaskInput } from 'react-imask';

const BusinessExpensesForm = ({ control, errors }) => {
	return (
		<Stack spacing={3} sx={{ borderRadius: 3, boxShadow: 5, p: 5 }}>
			<SubPageHeading>Business Expenses</SubPageHeading>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="business_expenses.name"
					defaultValue={''}
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Name of Business'}
							error={errors.business_expenses?.name ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="business_expenses.address"
					defaultValue={''}
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Address of Business'}
							error={errors.business_expenses?.address ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="business_expenses.date_began"
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
										error={errors.business_expenses?.date_began ? true : false}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
				<Controller
					name="business_expenses.date_ended"
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
										error={errors.business_expenses?.date_ended ? true : false}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="business_expenses.product_or_service"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Product or Service'}
							error={
								errors.business_expenses?.product_or_service ? true : false
							}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="business_expenses.ownership_percent"
					defaultValue={''}
					control={control}
					rules={{ required: false, min: 0, max: 100 }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Ownership Percentage (%)'}
							error={errors.business_expenses?.ownership_percent ? true : false}
							helperText={
								errors.business_expenses?.ownership_percent
									? 'Between 0 and 100'
									: ''
							}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="business_expenses.gst_number"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'GST Number'}
							error={errors.business_expenses?.gst_number ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="business_expenses.prepare_gst"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={errors.business_expenses?.prepare_gst ? true : false}>
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
					name="business_expenses.opening_inventory"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Opening Inventory'}
							error={errors.business_expenses?.opening_inventory ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="business_expenses.closing_inventory"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Closing Inventory'}
							error={errors.business_expenses?.closing_inventory ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="business_expenses.sales_commission_fees"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Sales Commission Fees'}
							error={
								errors.business_expenses?.sales_commission_fees ? true : false
							}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="business_expenses.purchases"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Purchases'}
							error={errors.business_expenses?.purchases ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="business_expenses.advertising"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Advertising'}
							error={errors.business_expenses?.advertising ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="business_expenses.insurance"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Insurance'}
							error={errors.business_expenses?.insurance ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="business_expenses.additional_info_or_comments"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Additional Info or Comments'}
							error={
								errors.business_expenses?.additional_info_or_comments
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

export default BusinessExpensesForm;
