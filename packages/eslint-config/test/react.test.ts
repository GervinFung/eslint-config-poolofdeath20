import { describe, it, expect } from 'vitest';
import { react } from '../src/react';
import base from '../src/base';

describe('react config', () => {
	it('should assert that react config is correct', () => {
		expect(react).toStrictEqual({
			...base,
			extends: [...base.extends, 'plugin:react/recommended'],
			rules: {
				...base.rules,
				'react/prop-types': 0,
			},
		});
	});
});
