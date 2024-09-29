import type { ConfigWithExtends } from 'typescript-eslint';

import { fixupPluginRules } from '@eslint/compat';
// @ts-expect-error: Missing types for 'eslint-plugin-import'
import eslintPluginImport from 'eslint-plugin-import';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
const importRules = Object.keys(eslintPluginImport.rules).reduce(
	(rules, rule) => {
		return {
			...rules,
			[`import/${rule}`]: 'error',
		};
	},
	{}
);

const base = {
	linterOptions: {
		reportUnusedDisableDirectives: 'error',
	},
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: process.cwd(),
		},
	},
	plugins: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		import: fixupPluginRules(eslintPluginImport),
	},
	rules: {
		...{
			...importRules,
			['import/no-unresolved']: 'off',
			['import/no-nodejs-modules']: 'off',
			['import/no-internal-modules']: 'off',
			['import/default']: 'off',
			['import/namespace']: 'off',
			['import/no-deprecated']: 'off',
			['import/prefer-default-export']: 'off',
			['import/no-named-as-default']: 'off',
			['import/no-named-as-default-member']: 'off',
			['import/no-relative-parent-imports']: 'off',
			'import/max-dependencies': [
				'error',
				{
					max: 16,
					ignoreTypeImports: true,
				},
			],
			'import/extensions': [
				'error',
				{
					json: 'always',
				},
			],
			'import/order': [
				'error',
				{
					groups: [
						'type',
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/no-unassigned-import': [
				'error',
				{
					allow: ['**/*.css'],
				},
			],
		},
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'generic',
			},
		],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^ignore',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{
				allowNumber: true,
				allowBoolean: true,
			},
		],
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/prefer-reduce-type-parameter': 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'arrow-body-style': ['error', 'always'],
		'no-restricted-syntax': [
			'error',
			{
				selector: 'TSEnumDeclaration',
				message: "Don't declare enums",
			},
		],
	},
} as const satisfies ConfigWithExtends;

export { base };
