import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}>
			<Stack spacing={3}>
				<Typography variant="h3">404</Typography>
				<Typography variant="subtitle1">Not Found</Typography>
			</Stack>
		</Box>
	);
};

export default NotFound;
