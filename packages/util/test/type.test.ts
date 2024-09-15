import type { Argument, DeepReadonly, Return } from '../src/type';

import { describe, expect, expectTypeOf, it } from 'vitest';

import { nullToUndefined } from '../src/type';

describe('Type should be manipulated with and can be checked', () => {
	it('should convert nullable value to undefinable value', () => {
		expect(nullToUndefined(null)).toBe(undefined);

		expect(nullToUndefined(true)).toBe(true);
	});

	it('should test the DeepReadonly type', () => {
		expectTypeOf<
			DeepReadonly<{
				a: {
					b: {
						c: 1;
					};
				};
			}>
		>().toMatchTypeOf<
			Readonly<{
				a: Readonly<{
					b: Readonly<{
						c: 1;
					}>;
				}>;
			}>
		>();

		type Fn = (condition: boolean) => Promise<1 | 2>;

		expectTypeOf<Argument<Fn>>().toMatchTypeOf<Parameters<Fn>[0]>();
		expectTypeOf<Return<Fn>>().toMatchTypeOf<Awaited<ReturnType<Fn>>>();
	});
});
