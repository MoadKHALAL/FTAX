import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import TaxRecords from './components/TaxRecords';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Tax from './components/Tax';
import TaxView from './components/TaxView';
import TaxFiling from './components/TaxFiling';
import TaxNew from './components/TaxNew';
import NotFound from './components/NotFound';
import UserProfile from './components/UserProfile';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route element={<Dashboard />}>
					<Route path="/" element={<Navigate to={'records'} />} />
					<Route path="records" element={<TaxRecords />} />
					<Route path="tax" element={<Tax />}>
						<Route path="view/:year" element={<TaxView />} />
						<Route path="file/new" element={<TaxNew />} />
						<Route path="file/:year" element={<TaxFiling />} />
					</Route>
					<Route path="profile" element={<UserProfile />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
