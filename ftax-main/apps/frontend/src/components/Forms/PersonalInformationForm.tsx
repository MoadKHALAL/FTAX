import React from 'react';
import {
	Stack,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

export default function PersonalInformationForm({
	control,
	errors,
	disableSIN,
	disableDOB,
}) {
	return (
		<Stack spacing={2}>
			<Stack spacing={3} direction="row" justifyContent="space-between">
				<Controller
					name="first_name"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'First Name'}
							error={errors.first_name ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="last_name"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Last Name'}
							error={errors.last_name ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Stack spacing={3} direction="row" justifyContent="space-between">
				<Controller
					name="gender"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<FormControl
							variant="outlined"
							sx={{ minWidth: '200px' }}
							fullWidth>
							<InputLabel id="gender-select">Gender</InputLabel>
							<Select
								labelId={'gender-select'}
								{...field}
								label={'Gender'}
								error={errors.gender ? true : false}>
								<MenuItem value={'Male'}>Male</MenuItem>
								<MenuItem value={'Female'}>Female</MenuItem>
								<MenuItem value={'Other'}>Other</MenuItem>
							</Select>
						</FormControl>
					)}
				/>
				<Controller
					name="date_of_birth"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								{...field}
								label={'Date of Birth'}
								renderInput={(params) => (
									<TextField
										{...params}
										disabled={disableDOB}
										error={errors.date_of_birth ? true : false}
										fullWidth
									/>
								)}
							/>
						</LocalizationProvider>
					)}
				/>
			</Stack>
			<Stack spacing={3} direction="row" justifyContent="space-between">
				<Controller
					name="social_insurrance_number"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							label={'Social Insurrance Number'}
							error={errors.social_insurrance_number ? true : false}
							fullWidth
							disabled={disableSIN}
							InputProps={{
								inputComponent: IMaskInput,
								inputProps: {
									...field,
									onAccept: field.onChange,
									mask: '000 000 000',
									placeholder: 'XXX XXX XXX',
								},
							}}
							InputLabelProps={{ shrink: true }}
						/>
					)}
				/>
				<Controller
					name="telephone"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							label={'Telephone'}
							error={errors.telephone ? true : false}
							fullWidth
							InputProps={{
								inputComponent: IMaskInput,
								inputProps: {
									...field,
									onAccept: field.onChange,
									mask: '(+1) 000 000 0000',
									placeholder: '(+1) XXX XXX XXXX',
								},
							}}
							InputLabelProps={{ shrink: true }}
						/>
					)}
				/>
			</Stack>
			<Stack spacing={3} direction="row" justifyContent="space-between">
				<Controller
					name="city"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'City'}
							error={errors.city ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="postal_code"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							label={'Postal Code'}
							error={errors.postal_code ? true : false}
							fullWidth
							InputProps={{
								inputComponent: IMaskInput,
								inputProps: {
									...field,
									onAccept: field.onChange,
									mask: 'a0a 0a0',
									placeholder: 'A1A 1A1',
								},
							}}
							InputLabelProps={{ shrink: true }}
						/>
					)}
				/>
			</Stack>
			<Stack spacing={3} direction="row" justifyContent="space-between">
				<Controller
					name="province_or_territory"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Province/Territory'}
							error={errors.province_or_territory ? true : false}
							fullWidth
						/>
					)}
				/>
				<Controller
					name="country"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label={'Country'}
							disabled
							error={errors.country ? true : false}
							fullWidth
						/>
					)}
				/>
			</Stack>
			<Controller
				name="address"
				control={control}
				rules={{ required: false }}
				render={({ field }) => (
					<TextField
						{...field}
						type="text"
						multiline
						label={'Address'}
						error={errors.address ? true : false}
						fullWidth
					/>
				)}
			/>
		</Stack>
	);
}
