import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import Certified from './CertifiedSection';
import FooterList from './FooterList';

const Footer = () => {
	return (
		<Box bg={'white'} color={'black'} border={'dimgray'} py={12}>
			<Container maxW={'container.lg'}>
				<FooterList />
				<Certified p={4} align={'center'} />
			</Container>
		</Box>
	);
};

export default Footer;
