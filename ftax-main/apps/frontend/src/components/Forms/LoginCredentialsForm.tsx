import React, { useRef } from 'react';
import { Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const LoginCredentialsForm = ({
	control,
	errors,
	watch,
	disableEmail,
	requirePassword,
}) => {
	const passwordRef = useRef({});
	passwordRef.current = watch('password', '');

	return (
		<Stack spacing={3}>
			<Controller
				name="email"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<TextField
						{...field}
						disabled={disableEmail}
						type="email"
						label={'Email'}
						error={errors.email ? true : false}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="password"
				control={control}
				rules={{
					required: requirePassword,
					minLength: 8,
				}}
				render={({ field }) => (
					<TextField
						{...field}
						type="text"
						label={'Password'}
						error={errors.password ? true : false}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="confirmPassword"
				control={control}
				rules={{
					required: requirePassword,
					validate: (v) =>
						v === passwordRef.current || 'Passwords do not match',
				}}
				render={({ field }) => (
					<TextField
						{...field}
						type="text"
						label={'Confirm Password'}
						error={errors.confirmPassword || errors.password ? true : false}
						fullWidth
						helperText={errors.confirmPassword?.message || ''}
					/>
				)}
			/>
		</Stack>
	);
};

export default LoginCredentialsForm;
