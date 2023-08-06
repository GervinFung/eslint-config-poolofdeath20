import { describe, it, expect } from 'vitest';
import base from '../../../src/config/lint/base';
import { react } from '../../../src/config/lint/react';

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
