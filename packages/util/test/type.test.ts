import { describe, expect, it } from 'vitest';
import { convertNullableToOptional } from '../src/type';

describe('Type should be manipulated with and can be checked', () => {
	it('should convert nullable value to undefinable value', () => {
		expect(convertNullableToOptional(null)).toBe(undefined);

		expect(convertNullableToOptional(true)).toBe(true);
	});
});
