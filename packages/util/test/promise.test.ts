import { describe, expect, it } from 'vitest';
import {
	sequentialPromise,
	sleepInMilliseconds,
	sleepInSeconds,
} from '../src/promise';

describe('A promise helper', () => {
	it('should sleep for a given second/millisecond', async () => {
		const value = await sleepInSeconds({
			seconds: 3,
			callback: async () => {
				return true;
			},
		});

		expect(value).toBe(true);

		const anotherValue = await sleepInMilliseconds({
			milliseconds: 3 * 1000,
			callback: async () => {
				return 'hi';
			},
		});

		expect(anotherValue).toBe('hi');
	});

	it('should execute an array of asynchronous functions in sequential order', async () => {
		const indexes = Array.from({ length: 5 }, (_, index) => {
			return index;
		});

		const result = await sequentialPromise(
			indexes.map((index) => {
				return async () => {
					return index;
				};
			})
		);

		expect(result).toEqual(indexes);
	});
});
