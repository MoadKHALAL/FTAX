// funcs
export const useCustomCompare = (obj1, obj2) =>
	// shallow compare of objects for xstate useSelector
	Object.keys(obj1).length === Object.keys(obj2).length &&
	Object.keys(obj1).every(
		(key) =>
			Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
	);

export const calculateTaxRecordCost = (taxRecord) => {
	let cost = 20;

	for (const key in taxRecord) {
		if (key.startsWith('has_')) {
			if (typeof taxRecord[key] === 'boolean' && taxRecord[key] === true) {
				cost += 10;
			}
		}
	}

	return cost;
};

// temporary func
export const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// localStorage funcs
export const isAuthTokenPresent = () => {
	return localStorage.getItem('token') ? true : false;
};

export const getAuthToken = () => {
	return localStorage.getItem('token');
};

export const setAuthToken = (token: string) => {
	localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
	localStorage.removeItem('token');
};
