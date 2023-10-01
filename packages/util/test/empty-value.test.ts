import { describe, expect, it } from 'vitest';
import { Empty } from '../src/empty-value';

describe('A empty value as an alternative to null/undefined', () => {
	it('should assert if a value is Empty', () => {
		const empty = Empty.of();

		expect(Empty.isEmpty(empty)).toBe(true);
	});

	it('should assert if a value is not Empty', () => {
		const empty = 1;

		expect(Empty.isNotEmpty(empty)).toBe(true);
	});
});
