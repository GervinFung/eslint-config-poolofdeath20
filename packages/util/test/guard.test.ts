import { describe, expect, expectTypeOf, it } from 'vitest';
import {
	isNeitherNullNorUndefined,
	isNotNull,
	isNotUndefined,
	guardAsDefined,
	isTruthy,
	isFalsy,
} from '../src/guard';

describe('Type guard should remove null, undefined value from a given value', () => {
	const listWithEmptyValue = [1, undefined, 2, null, 3];

	describe('guard or throw', () => {
		it.each([null, undefined])(
			'should throw error when a value is %o',
			(value) => {
				const error = new Error('value is not defined');

				expect(() => guardAsDefined({ value, error })).toThrow(error);
			}
		);

		it('should return a value when a value is defined', () => {
			const error = new Error('value is not defined');

			expect(guardAsDefined({ value: 1, error })).toBe(1);
		});
	});

	it('should assert whether a value is falsy or truthy', () => {
		const falsyValues = [0, '', false, null, undefined];
		const truthyValues = [1, 'defined', true, { a: 1 }, []];

		const values = [...falsyValues, ...truthyValues];

		expect(values.filter(isTruthy)).toStrictEqual(truthyValues);

		expect(values.filter(isFalsy)).toStrictEqual(falsyValues);
	});

	it('should return a value when a value is defined', () => {
		const error = new Error('value is not defined');

		expect(guardAsDefined({ value: 1, error })).toBe(1);
	});
	it('should remove null/undefined value from a list', () => {
		const filteredOnceNumbers = listWithEmptyValue.filter(
			isNeitherNullNorUndefined
		);

		expectTypeOf(filteredOnceNumbers).toEqualTypeOf<Array<number>>();

		const filteredTwiceNumbers = listWithEmptyValue
			.filter(isNotNull)
			.filter(isNotUndefined);

		expect(filteredTwiceNumbers).toStrictEqual(filteredOnceNumbers);
	});
});
