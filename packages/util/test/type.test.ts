import { describe, expect, it } from 'vitest';

import { nullToUndefined } from '../src/type';

describe('Type should be manipulated with and can be checked', () => {
	it('should convert nullable value to undefinable value', () => {
		expect(nullToUndefined(null)).toBe(undefined);

		expect(nullToUndefined(true)).toBe(true);
	});
});
