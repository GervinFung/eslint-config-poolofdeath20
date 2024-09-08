import { describe, expect, it, vi } from 'vitest';

import { Defined } from '../src/defined';

describe('Define structure', () => {
	it('should handle empty value with an `else` path', () => {
		expect(
			Defined.parse(1 as Readonly<{ id: number }> | number)
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

	it('should run appropriate function based on value', () => {
		const functions = {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			ifDefined: () => {},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			ifNotDefined: () => {},
		};

		const ifDefinedSpy = vi.spyOn(functions, 'ifDefined');
		const ifNotDefinedSpy = vi.spyOn(functions, 'ifNotDefined');

		Defined.parse(1).ifDefined(functions.ifDefined);

		expect(ifDefinedSpy).toHaveBeenCalledTimes(1);

		Defined.parse(undefined).ifDefined(functions.ifNotDefined);

		expect(ifNotDefinedSpy).toHaveBeenCalledTimes(0);
	});
});
