import React from 'react';
import { Controller } from 'react-hook-form';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Stack,
	Switch,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import SubPageHeading from '../Headings/SubPageHeading';

const TaxInformationForm = ({ control, errors, disableYear }) => {
	return (
		<Stack spacing={3}>
			<Controller
				name="year"
				defaultValue={''}
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<FormControl variant="outlined" sx={{ minWidth: '200px' }}>
						<InputLabel id="tax-year">Tax Year</InputLabel>
						<Select
							labelId={'tax-year'}
							{...field}
							label={'Tax Year'}
							disabled={disableYear}
							error={errors.year ? true : false}>
							<MenuItem value={'2020'}>2020</MenuItem>
							<MenuItem value={'2021'}>2021</MenuItem>
						</Select>
					</FormControl>
				)}
			/>
			<SubPageHeading>Checklist for Forms:</SubPageHeading>
			<Stack direction="row" spacing={3} flexWrap="wrap">
				<Controller
					name="has_rental_expenses"
					defaultValue={false}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormGroup>
							<FormControlLabel
								control={<Switch {...field} checked={field.value} />}
								label="Rental Expenses"
							/>
						</FormGroup>
					)}
				/>
				<Controller
					name="has_business_expenses"
					defaultValue={false}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormGroup>
							<FormControlLabel
								control={<Switch {...field} checked={field.value} />}
								label="Business Expenses"
							/>
						</FormGroup>
					)}
				/>
				<Controller
					name="has_employment_expenses"
					defaultValue={false}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormGroup>
							<FormControlLabel
								control={<Switch {...field} checked={field.value} />}
								label="Employment Expenses"
							/>
						</FormGroup>
					)}
				/>
				<Controller
					name="has_motor_vehicle_expenses"
					defaultValue={false}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormGroup>
							<FormControlLabel
								control={<Switch {...field} checked={field.value} />}
								label="Motor Vehicle Expenses"
							/>
						</FormGroup>
					)}
				/>
				<Controller
					name="has_moving_expenses"
					defaultValue={false}
					control={control}
					rules={{ required: false }}
					render={({ field }) => (
						<FormGroup>
							<FormControlLabel
								control={<Switch {...field} checked={field.value} />}
								label="Moving Expenses"
							/>
						</FormGroup>
					)}
				/>
			</Stack>
		</Stack>
	);
};

export default TaxInformationForm;
