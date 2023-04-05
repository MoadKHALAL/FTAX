import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import SubPageHeading from '../Headings/SubPageHeading';

const BusinessExpenses = ({ business_expenses }) => {
	return (
		<Stack spacing={3}>
			<SubPageHeading>Business Expenses</SubPageHeading>
			<Divider />
			{Object.entries(business_expenses).map((field, index) => {
				const key = field[0]
					.split('_')
					.map((w) => `${w[0].toUpperCase()}${w.substring(1)}`)
					.join(' ');
				return (
					<Stack key={index} direction="row" justifyContent="space-evenly">
						<Item>{key}</Item>
						<Item>{field[1]}</Item>
					</Stack>
				);
			})}
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

export default BusinessExpenses;
