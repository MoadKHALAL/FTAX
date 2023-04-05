import { Box } from '@chakra-ui/react';
import React from 'react';
import MainContainer from './MainContainer';
import StyleGraphic from './StyleGraphic';
import TitleComponent from './TitleComponent';

const MainSection = () => {
	return (
		<Box position={'relative'} overflow={'hidden'}>
			<MainContainer>
				<TitleComponent />
			</MainContainer>
			<StyleGraphic />
		</Box>
	);
};

export default MainSection;
