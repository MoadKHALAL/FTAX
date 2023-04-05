import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

const DiscoverSection = () => {
	return (
		<Box border={'dimgray'}>
			<Container maxW={'container.lg'}>
				<VStack spacing={4} py={'16'}>
					<Heading color={'green.400'}>About/Information</Heading>
					<Box w="100%" h="300px"></Box>
				</VStack>
			</Container>
		</Box>
	);
};

export default DiscoverSection;
