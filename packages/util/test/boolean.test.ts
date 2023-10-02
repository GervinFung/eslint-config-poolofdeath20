import { describe, expect, it } from 'vitest';
import { isFalse, isFalsy, isTruthy } from '../src/boolean';

describe('A boolean wrapper with a function that should be able to determines whether it is true/false', () => {
	it('should assert if a boolean value is true/false', () => {
		expect(isFalse(true)).toBe(false);
		expect(isFalse(false)).toBe(true);
	});

	it('should assert whether a value is falsy or truthy', () => {
		const falsyValues = [0, '', false, null, undefined];
		const truthyValues = [1, 'defined', true, { a: 1 }, []];

		const values = [...falsyValues, ...truthyValues];

		expect(values.filter(isTruthy)).toStrictEqual(truthyValues);

		expect(values.filter(isFalsy)).toStrictEqual(falsyValues);
	});
});
