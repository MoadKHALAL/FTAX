import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import theme from '../theme';

/**
 * Custom Document structure for pages rendered by Next.js
 * @return {React.Component}
 */
export default class Document extends NextDocument {
	/**
	 * Render function of a class component that spits out JSX
	 * @return {React.JSXElementConstructor}
	 */
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					{/* 👇 Here's the script */}
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
