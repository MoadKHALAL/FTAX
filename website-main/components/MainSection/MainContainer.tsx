import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const MainContainer = ({ children, ...props }) => {
	return (
		<Container maxW={'container.lg'} minH={'87vh'}>
			<Flex
				align="center"
				justify="space-between"
				wrap="wrap"
				w="100%"
				p={8}
				bg={'transparent'}
				color={useColorModeValue('black', 'white')}
				{...props}>
				{children}
			</Flex>
		</Container>
	);
};

export default MainContainer;
