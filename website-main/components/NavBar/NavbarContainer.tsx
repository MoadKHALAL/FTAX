import React from 'react';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';

const NavBarContainer = ({ children, ...props }) => {
	return (
		<Container maxW={'container.lg'}>
			<Flex
				as="nav"
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

export default NavBarContainer;
