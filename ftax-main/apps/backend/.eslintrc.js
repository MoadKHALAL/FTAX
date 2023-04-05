module.exports = {
	...require('configs/eslintrc-node.js'),
	parserOptions: {
		root: true,
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
};
