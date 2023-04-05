import { Box, Container, Divider } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../context/AppStateProvider';
import PageHeading from './Headings/PageHeading';
import SubTaxNew from './SubComponents/SubTaxNew';

const TaxNew = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;

	useEffect(() => {
		send('NEW_FILE_TAX');
	});

	return (
		<Box>
			<Container>
				<PageHeading>New Tax Filing</PageHeading>
				<Divider sx={{ my: '10px' }} />
				<Box>
					<SubTaxNew />
				</Box>
			</Container>
		</Box>
	);
};

export default TaxNew;
