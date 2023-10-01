import { describe, expect, it } from 'vitest';
import { capitalize, isBlank, isEmpty } from '../src/string';

describe('String should be manipulated with and can be checked', () => {
	it('should assert blank/empty string', () => {
		expect(isEmpty('')).toBe(true);

		expect(isBlank(' ')).toBe(true);
	});

	it('should capitalize a string', () => {
		expect(capitalize('string is good')).toBe('String is good');
	});
});
