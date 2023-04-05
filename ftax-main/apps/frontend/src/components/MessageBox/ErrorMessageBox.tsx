import { Error } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const ErrorMessageBox = ({ title, message }) => {
	return (
		<Box
			sx={{
				backgroundColor: 'rgba(255,0,0,0.15)',
				border: '1px solid red',
				borderRadius: 3,
				p: 2,
				color: 'text.primary',
			}}>
			<Stack direction="row" spacing={2} alignItems="center">
				<Error color="error" />
				<Stack spacing={1}>
					<Typography variant="h6" alignItems="center">
						{title}
					</Typography>
					<Typography variant="subtitle1">{message}</Typography>
				</Stack>
			</Stack>
		</Box>
	);
};

export default ErrorMessageBox;
