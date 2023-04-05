import { Flex, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Logo from '../Logo';

const FooterList = (props) => {
	return (
		<Flex
			align={'flex-start'}
			justify={['center', 'space-between', 'space-between', 'space-between']}
			direction={['column', 'row', 'row', 'row']}
			{...props}>
			<Logo />
			<Stack>
				<Link href={'/security'} passHref>
					<Text as={'a'}>Security</Text>
				</Link>
				<Link href={'/tos'} passHref>
					<Text as={'a'}>Terms of Service</Text>
				</Link>
				<Link href={'/privacy'} passHref>
					<Text as={'a'}>Privacy Policy</Text>
				</Link>
			</Stack>
		</Flex>
	);
};

export default FooterList;
