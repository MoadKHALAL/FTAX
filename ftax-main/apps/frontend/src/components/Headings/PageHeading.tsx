import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

// eslint-disable-next-line react/prop-types
const PageHeading = ({ children }) => {
	return (
		<Box sx={{ my: '20px' }}>
			<Typography variant="h4">{children}</Typography>
		</Box>
	);
};

export default PageHeading;
