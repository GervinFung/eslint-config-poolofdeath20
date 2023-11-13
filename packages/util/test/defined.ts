import { describe, expect, it } from 'vitest';
import { Defined } from '../src/defined';

describe('Define structure', () => {
	it('should handle empty value with an `else` path', () => {
		expect(
			Defined.parse(1)
				.map((id) => {
					return {
						id,
					};
				})
				.orGet(2)
		).toStrictEqual({
			id: 1,
		});

		expect(
			Defined.parse(undefined as string | undefined)
				.map((string) => {
					return {
						list: string.split(''),
					};
				})
				.orElse(() => {
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
