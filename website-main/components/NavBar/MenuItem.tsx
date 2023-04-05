import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const MenuItem = ({ children, to = '/', ...rest }) => {
	return (
		<Link href={to} passHref>
			<Text as={'a'} display={{ base: 'block', md: 'auto' }} {...rest}>
				{children}
			</Text>
		</Link>
	);
};

export default MenuItem;
