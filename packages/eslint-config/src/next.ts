import type { ConfigWithExtends } from 'typescript-eslint';

import { fixupPluginRules } from '@eslint/compat';
// @ts-expect-error: Missing types for '@next/eslint-plugin-next'
import eslintPluginNext from '@next/eslint-plugin-next';

import { react } from './react';

const next = {
	...react,
	plugins: {
		...react.plugins,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		'@next/next': fixupPluginRules(eslintPluginNext),
	},
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	rules: {
		...react.rules,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		...eslintPluginNext.configs['core-web-vitals'].rules,
	},
} as const satisfies ConfigWithExtends;

export { next };
