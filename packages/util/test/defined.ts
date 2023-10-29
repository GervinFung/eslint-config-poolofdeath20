import { describe, expect, it } from 'vitest';
import { Defined } from '../src/defined';

describe('Define structure', () => {
	it('should handle empty value with an `else` path', () => {
		expect(Defined.parse(1).orGet(2)).toBe(1);

		expect(
			Defined.parse(undefined).orElse(() => {
				return 'A';
			})
		).toBe('A');

		expect(() => {
			Defined.parse(null).orThrow(new Error('error'));
		}).toThrowError('error');

		expect(() => {
			Defined.parse(null).orThrow('hi');
		}).toThrowError('hi');
	});
});
