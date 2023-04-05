import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const TitleComponent = () => {
	return (
		<Box maxW={'34rem'} py={'16'}>
			<VStack spacing={8} align={['center', 'flex-start']}>
				<Heading color={'green.400'} size={'2xl'} fontWeight={'extrabold'}>
					It&apos;s not too late to file your taxes!
				</Heading>
				<Text>
					Get started with your tax returns using our platform, compliant with
					CRA. /* Some text to go here*/
				</Text>
				<Link href={'/'} passHref>
					<Button p={3} _hover={{ bg: 'green.400' }}>
						<HStack>
							<Text>File your tax returns</Text>
							<ChevronRightIcon />
						</HStack>
					</Button>
				</Link>
			</VStack>
		</Box>
	);
};

export default TitleComponent;
