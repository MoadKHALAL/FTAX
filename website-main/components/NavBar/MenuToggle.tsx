import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';

const MenuToggle = ({ toggle, isOpen, ...rest }) => {
	return (
		<Box
			display={{ base: 'block', md: 'none' }}
			onClick={toggle}
			{...rest}
			as={'button'}>
			{isOpen ? <CloseIcon /> : <HamburgerIcon />}
		</Box>
	);
};

export default MenuToggle;
