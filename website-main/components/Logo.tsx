import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Logo = (props) => {
	return (
		<Box {...props}>
			<Text fontSize={'3xl'} letterSpacing={'wider'} fontWeight={'extrabold'}>
				F
				<Text as="span" color="green.300">
					Tax
				</Text>
			</Text>
		</Box>
	);
};

export default Logo;
