const base = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
	],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-extra-semi': 'error',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/camelcase': 'off',
		'no-async-promise-executor': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'no-fallthrough': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],
		'import/no-anonymous-default-export': 'error',
		'import/no-unresolved': 'off',
		'import/named': 'off',
		'no-constant-condition': 'error',
		'no-restricted-syntax': [
			'error',
			{
				selector: 'TSEnumDeclaration',
				message: "Don't declare enums",
			},
		],
		semi: ['error', 'always'],
		'arrow-body-style': ['error', 'always'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
	},
} as const;

export default base;
