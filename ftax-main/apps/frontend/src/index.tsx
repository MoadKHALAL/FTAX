import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { AppStateProvider } from './context/AppStateProvider';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './customTheme';

ReactDOM.render(
	<AppStateProvider>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</AppStateProvider>,
	document.getElementById('root')
);
