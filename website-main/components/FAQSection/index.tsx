import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

const FAQSection = () => {
	return (
		<Box border={'dimgray'} bg={'white'} color={'black'}>
			<Container maxW={'container.lg'}>
				<VStack spacing={4} py={'16'}>
					<Heading color={'green.400'}>Frequently Asked Questions</Heading>
					<Box w="100%" h="300px"></Box>
				</VStack>
			</Container>
		</Box>
	);
};

export default FAQSection;
