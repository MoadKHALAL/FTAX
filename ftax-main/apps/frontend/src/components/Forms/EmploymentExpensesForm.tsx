import React from 'react';
import { Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import SubPageHeading from '../Headings/SubPageHeading';

const EmploymentExpensesForm = ({ control, errors }) => {
	return (
		<Stack spacing={3} sx={{ borderRadius: 3, boxShadow: 5, p: 5 }}>
			<SubPageHeading>Employment Expenses</SubPageHeading>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Controller
					name="employment_expenses.date_began"
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
											errors.employment_expenses?.date_began ? true : false
										}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
				<Controller
					name="employment_expenses.date_ended"
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
											errors.employment_expenses?.date_ended ? true : false
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
					name="employment_expenses.travelling_expenses"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Travelling Expenses'}
							error={
								errors.employment_expenses?.travelling_expenses ? true : false
							}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="employment_expenses.parking"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Parking'}
							error={errors.employment_expenses?.parking ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="employment_expenses.supplies"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Supplies'}
							error={errors.employment_expenses?.supplies ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="employment_expenses.legal_fees"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Legal Fees'}
							error={errors.employment_expenses?.legal_fees ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="employment_expenses.other_expenses"
					defaultValue={''}
					control={control}
					rules={{
						required: false,
					}}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label={'Other Expenses'}
							error={errors.employment_expenses?.other_expenses ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-evenly">
				<Controller
					name="employment_expenses.additional_info_or_comments"
					defaultValue={''}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Additional Info or Comments'}
							error={
								errors.employment_expenses?.additional_info_or_comments
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

export default EmploymentExpensesForm;
