module.exports = {
	...require('configs/eslintrc-react.js'),
	rules: {
		'no-unused-vars': 'warn',
		'no-unused-labels': 'warn',
		'require-jsdoc': 'off',
		'react/prop-types': 'warn',
		camelcase: 'off',
		'no-case-declarations': 'off',
		'prefer-const': 'warn',
		'no-useless-escape': 'warn',
	},
};
