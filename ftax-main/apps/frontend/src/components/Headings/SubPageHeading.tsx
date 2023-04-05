import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

// eslint-disable-next-line react/prop-types
const SubPageHeading = ({ children }) => {
	return (
		<Box sx={{ my: '20px' }}>
			<Typography variant="h6">{children}</Typography>
		</Box>
	);
};

export default SubPageHeading;
