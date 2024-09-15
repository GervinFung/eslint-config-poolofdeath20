import { describe, expect, expectTypeOf, it } from 'vitest';

import { Argument, DeepReadonly, Return, nullToUndefined } from '../src/type';

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

		type Func = (a: number, b: number) => Promise<number>;

		expectTypeOf<Argument<Func>>().toMatchTypeOf<Parameters<Func>[0]>();
		expectTypeOf<Return<Func>>().toMatchTypeOf<Awaited<ReturnType<Func>>>();
	});
});
