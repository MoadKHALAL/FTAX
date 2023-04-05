import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import theme from '../theme';

/**
 * App Component of the website
 * @return {React.Component} Component
 */
function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
