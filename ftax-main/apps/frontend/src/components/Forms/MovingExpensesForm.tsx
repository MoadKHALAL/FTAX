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

const MovingExpensesForm = ({ control, errors }) => {
	return (
		<Stack spacing={3} sx={{ borderRadius: 3, boxShadow: 5, p: 5 }}>
			<SubPageHeading>Moving Expenses</SubPageHeading>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="moving_expenses.old_address"
					defaultValue={''}
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Old Address'}
							error={errors.moving_expenses?.old_address ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="moving_expenses.new_address"
					defaultValue={''}
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'New Business'}
							error={errors.moving_expenses?.new_address ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="moving_expenses.date_of_move"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								{...field}
								label={'Date of Move'}
								renderInput={(params) => (
									<TextField
										{...params}
										error={errors.moving_expenses?.date_of_move ? true : false}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
				<Controller
					name="moving_expenses.activity_start_date"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								{...field}
								label={'Activity Start Date'}
								renderInput={(params) => (
									<TextField
										{...params}
										error={
											errors.moving_expenses?.activity_start_date ? true : false
										}
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
					name="moving_expenses.members_moved"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Members Moved'}
							error={errors.moving_expenses?.members_moved ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="moving_expenses.meals_purchased"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Meals Purchased'}
							error={errors.moving_expenses?.meals_purchased ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="moving_expenses.reason_is_job"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={errors.moving_expenses?.reason_is_job ? true : false}>
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
									label="Is Reason Job?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="moving_expenses.reason_is_studies"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={errors.moving_expenses?.reason_is_studies ? true : false}>
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
									label="Is Reason Studies?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="moving_expenses.is_reimbursed"
					defaultValue={'No'}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormControl
							sx={{ minWidth: '200px' }}
							error={errors.moving_expenses?.is_reimbursed ? true : false}>
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
									label="Is Reimbursed?"
								/>
							</FormGroup>
						</FormControl>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="moving_expenses.additional_info_or_comments"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Additional Info or Comments'}
							error={
								errors.moving_expenses?.additional_info_or_comments
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

export default MovingExpensesForm;
