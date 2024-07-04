import base from './base';

const react = {
	...base,
	extends: [...base.extends, 'plugin:react/recommended'],
	plugins: [...base.plugins, 'react-hooks', 'react-refresh', 'jsx-a11y'],
	rules: {
		...base.rules,
		'react/prop-types': 0,
		'react/jsx-uses-react': 0,
		'react/react-in-jsx-scope': 0,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
} as const;

export { react };
