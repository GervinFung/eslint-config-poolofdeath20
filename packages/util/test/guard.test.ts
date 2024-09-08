import { describe, expect, expectTypeOf, it } from 'vitest';

import {
	isNeitherNullNorUndefined,
	isNotNull,
	isNotUndefined,
} from '../src/guard';

describe('Type guard should remove null, undefined value from a given value', () => {
	const listWithEmptyValue = [1, undefined, 2, null, 3];

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
