import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import SubPageHeading from '../Headings/SubPageHeading';

const TaxInformation = ({ taxRecord }) => {
	return (
		<Stack spacing={3}>
			<SubPageHeading>Tax Information</SubPageHeading>
			<Divider />
			<Stack direction="row" justifyContent="space-evenly">
				<Item>Year</Item>
				<Item>{taxRecord.year}</Item>
			</Stack>
			<Stack direction="row" justifyContent="space-evenly">
				<Item>Submitted</Item>
				<Item>{taxRecord.submitted ? 'Yes' : 'No'}</Item>
			</Stack>
			<Stack direction="row" justifyContent="space-evenly">
				<Item>Status</Item>
				<Item>{taxRecord.status}</Item>
			</Stack>
		</Stack>
	);
};

const Item = ({ children, ...props }) => {
	return (
		<Typography
			variant="subtitle1"
			sx={{
				width: '100%',
				p: '0.5rem',
				overflowWrap: 'anywhere',
				borderBottom: '1px solid rgba(0,0,0,0.1)',
			}}
			{...props}>
			{children}
		</Typography>
	);
};

export default TaxInformation;
