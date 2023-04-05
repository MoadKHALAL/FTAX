import React, { useContext, useEffect } from 'react';

import { Container, Box, Divider } from '@mui/material';
import { AppStateContext } from '../context/AppStateProvider';
import PageHeading from './Headings/PageHeading';
import SubTaxView from './SubComponents/SubTaxView';
import { useParams } from 'react-router-dom';

const TaxView = () => {
	const { rootService } = useContext(AppStateContext);
	const { send } = rootService;
	const { year } = useParams();

	useEffect(() => {
		send('VIEW_TAX', { year });
	});
	return (
		<Box>
			<Container>
				<PageHeading>View Tax</PageHeading>
				<Divider sx={{ my: '10px' }} />

				<Box>
					<SubTaxView />
				</Box>
			</Container>
		</Box>
	);
};

export default TaxView;
