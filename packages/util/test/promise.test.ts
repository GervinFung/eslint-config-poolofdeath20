import { describe, expect, it } from 'vitest';
import { sleepInMilliseconds, sleepInSeconds } from '../src/promise';

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
});
