import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Stack } from '@chakra-ui/react';
import React from 'react';
import ColorModeButton from './ColorModeButton';
import MenuItem from './MenuItem';

const MenuList = ({ isOpen }) => {
	return (
		<Box
			display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
			flexBasis={{ base: '100%', md: 'auto' }}>
			<Stack
				spacing={8}
				pt={[4, 4, 0, 0]}
				align="center"
				justify={['center', 'space-between', 'flex-start', 'flex-end']}
				direction={['column', 'column', 'row', 'row']}>
				<MenuItem to="/">Blog</MenuItem>
				<MenuItem to="/">Contact Us</MenuItem>
				<ColorModeButton as={Button} bg={'transparent'} />
				<MenuItem
					to="/"
					as={Button}
					bg={'green.400'}
					_hover={{ bg: 'green.400' }}>
					Start your Tax Return <ChevronRightIcon />
				</MenuItem>
			</Stack>
		</Box>
	);
};

export default MenuList;
