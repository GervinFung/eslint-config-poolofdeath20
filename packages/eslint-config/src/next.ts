import base from './base';
import { react } from './react';

const next = {
	...react,
	extends: [...base.extends, ...react.extends, 'next/core-web-vitals'],
	rules: {
		...react.rules,
		'react/prop-types': 0,
	},
} as const;

export { next };
