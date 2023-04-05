import { Box, Container, Stack, Button, Divider } from '@mui/material';
import { Save } from '@mui/icons-material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppStateContext } from '../context/AppStateProvider';
import PageHeading from './Headings/PageHeading';
import SubTaxFiling from './SubComponents/SubTaxFiling';

const TaxFiling = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const { year } = useParams();

	useEffect(() => {
		send('FILE_TAX', { year });
	});

	return (
		<Box>
			<Container>
				<PageHeading>Edit Tax Filing</PageHeading>
				<Divider sx={{ my: '10px' }} />
				<Box>
					<SubTaxFiling />
				</Box>
			</Container>
		</Box>
	);
};

export default TaxFiling;
