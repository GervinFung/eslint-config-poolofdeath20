import { describe, expect, it } from 'vitest';

import { equal, equalTo } from '../src/equal';

describe('A deep equal function', () => {
	it.each([
		{
			value: 1,
			expected: 1,
		},
		{
			value: {
				a: {
					b: {
						c: [new Set([1, 2, 3]), new Set([1, 2, 3])],
					},
				},
			},
			expected: {
				a: {
					b: {
						c: [new Set([1, 2, 3]), new Set([1, 2, 3])],
					},
				},
			},
		},
		{
			value: new WeakSet([new Set([1, 2, 3])]),
			expected: new WeakSet([new Set([1, 2, 3])]),
		},
	])('should assert if two values are equal', ({ value, expected }) => {
		expect(equal(value, expected)).toBe(true);
		expect(equalTo(value)(expected)).toBe(true);

		expect(equal(value, undefined)).toBe(false);
		expect(equalTo(value)(undefined)).toBe(false);
	});
});
