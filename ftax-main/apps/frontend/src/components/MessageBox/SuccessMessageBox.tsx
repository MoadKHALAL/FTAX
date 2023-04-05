import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const SuccessMessageBox = ({ title, message }) => {
	const [hide, setHide] = useState(false);

	useEffect(() => {
		setTimeout(() => setHide(true), 3000);
	}, []);

	return (
		<Box
			display={hide ? 'none' : 'block'}
			sx={{
				backgroundColor: 'rgba(0,255,0,0.15)',
				border: '1px solid green',
				borderRadius: 3,
				p: 2,
				color: 'text.primary',
			}}>
			<Stack direction="row" spacing={2} alignItems="center">
				<CheckCircle color="success" />
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

export default SuccessMessageBox;
