import { describe, expect, it, vi } from 'vitest';

import { Optional } from '../src/optional';

describe('Optional structure', () => {
	it('should handle empty value with an `else` path', () => {
		expect(Optional.from(1).unwrapOrGet(2)).toBe(1);

		expect(
			Optional.from(undefined).unwrapOrElse(() => {
				return 'A';
			})
		).toBe('A');

		expect(() => {
			Optional.from(null).unwrapOrThrow(new Error('error'));
		}).toThrowError('error');

		expect(() => {
			Optional.from(null).unwrapOrThrow('hi');
		}).toThrowError('hi');
	});

	it.each([
		{
			input: {
				name: 'John',
				jobs: ['job1', 'job2'],
			},
			output: 'J',
		},
		{
			input: {
				name: 'John',
				jobs: [],
			},
			output: undefined,
		},
	])('should handle empty value in a chainable way', ({ input, output }) => {
		const result = Optional.from(input)
			.flatMap((manager) => {
				return Optional.from(manager.jobs.at(0));
			})
			.flatMap((job) => {
				return Optional.from(job.at(0));
			})
			.map((char) => {
				return char.toUpperCase();
			});

		expect(result.unwrapOrGet(undefined)).toBe(output);

		expect(result.isSome()).toBe(output !== undefined);

		expect(result.isNone()).toBe(output === undefined);
	});

	it('should run/return appropriate function/result based on value', () => {
		const functions = {
			ifSome: () => {},
			ifNone: () => {},
		};

		const ifSomeSpy = vi.spyOn(functions, 'ifSome');
		const ifNoneSpy = vi.spyOn(functions, 'ifNone');

		const somes = Optional.some([1, 2, 3]);

		somes.ifSome(functions.ifSome);
		somes.ifNone(functions.ifNone);

		expect(ifSomeSpy).toHaveBeenCalledTimes(1);
		expect(ifNoneSpy).toHaveBeenCalledTimes(0);

		const matchSome = somes.match({
			some: (value) => {
				return value.at(-1);
			},
			none: () => {
				return new Error('error');
			},
		});

		expect(matchSome).toStrictEqual(3);

		const none = Optional.none<Date>();

		none.ifNone(functions.ifNone);
		none.ifSome(functions.ifSome);

		expect(ifNoneSpy).toHaveBeenCalledTimes(1);
		expect(ifSomeSpy).toHaveBeenCalledTimes(1);

		const matchNone = none.match({
			some: (value) => {
				return value.getTime();
			},
			none: () => {
				return 3;
			},
		});

		expect(matchNone).toBe(3);
	});
});
