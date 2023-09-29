import base from './base';

const react = {
	...base,
	extends: [...base.extends, 'plugin:react/recommended'],
	rules: {
		...base.rules,
		'react/prop-types': 0,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
} as const;

export { react };
