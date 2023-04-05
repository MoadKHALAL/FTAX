import {
	Box,
	Container,
	Heading,
	VStack,
	Text,
	Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const DiscoverSection = () => {
	return (
		<Box bg={'white'} color={'black'} border={'dimgray'}>
			<Container>
				<VStack spacing={4} py={'16'}>
					<Heading color={'green.400'}>Discover FTax Service</Heading>
					<Text>Learn more about what you&apos;ll find in our product.</Text>
					<Link href={'/blog'} passHref>
						<Button
							bg={'green.400'}
							color={'white'}
							_hover={{ bg: 'green.400' }}>
							Learn More
						</Button>
					</Link>
				</VStack>
			</Container>
		</Box>
	);
};

export default DiscoverSection;
