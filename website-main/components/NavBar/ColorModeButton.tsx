import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, useColorMode, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const ColorModeButton = (props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const useText = useBreakpointValue({ base: true, md: false });

	return (
		<Box onClick={toggleColorMode} {...props}>
			{colorMode === 'light' ? (
				useText ? (
					'Dark Mode'
				) : (
					<MoonIcon />
				)
			) : useText ? (
				'Light Mode'
			) : (
				<SunIcon />
			)}
		</Box>
	);
};

export default ColorModeButton;
