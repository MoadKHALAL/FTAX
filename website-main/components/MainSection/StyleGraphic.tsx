import { DragHandleIcon } from '@chakra-ui/icons';
import React from 'react';

const StyleGraphic = () => {
	return (
		<DragHandleIcon
			position={'absolute'}
			color={'green.400'}
			zIndex={-1000}
			right={['-35%', '-5%']}
			bottom={['-10%', '-10%']}
			fontSize={['20rem', '37rem']}
			transform={'rotate(45deg)'}
		/>
	);
};

export default StyleGraphic;
