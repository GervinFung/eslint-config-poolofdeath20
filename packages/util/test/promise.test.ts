import { describe, expect, it } from 'vitest';
import {
	sequentialPromise,
	sleepInMilliseconds,
	sleepInSeconds,
} from '../src/promise';

describe('A promise helper', () => {
	it.each([
		{
			seconds: {
				callback: () => {
					return Promise.resolve(true);
				},
				expected: true,
			},
			milliseconds: {
				callback: () => {
					return Promise.resolve('hi');
				},
				expected: 'hi',
			},
		},
		{
			seconds: {
				expected: false,
			},
			milliseconds: {
				expected: 'hello',
			},
		},
	])(
		'should sleep for a given second/millisecond with or without a callback',
		async ({ seconds, milliseconds }) => {
			const secondsResolved = await sleepInSeconds({
				seconds: 1,
				callback: seconds.callback,
			});

			expect(
				secondsResolved.match({
					some: (value) => {
						return value;
					},
					none: () => {
						return false;
					},
				})
			).toBe(seconds.expected);

			const millisecondsResolved = await sleepInMilliseconds({
				milliseconds: 1 * 1000,
				callback: milliseconds.callback,
			});

			expect(
				millisecondsResolved.match({
					some: (value) => {
						return value;
					},
					none: () => {
						return 'hello';
					},
				})
			).toBe(milliseconds.expected);
		}
	);

	it('should execute an array of asynchronous functions in sequential order', async () => {
		const indexes = Array.from({ length: 5 }, (_, index) => {
			return index;
		});

		const result = await sequentialPromise(
			indexes.map((index) => {
				return () => {
					return Promise.resolve(index);
				};
			})
		);

		expect(result).toEqual(indexes);
	});
});
