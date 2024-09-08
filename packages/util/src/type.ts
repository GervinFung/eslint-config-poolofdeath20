const nullToUndefined = <T>(value: NonNullable<T> | null) => {
	return value ?? undefined;
};

type DeepReadonly<T> =
	T extends Array<infer R>
		? ReadonlyArray<DeepReadonly<R>>
		: T extends Set<infer R>
			? ReadonlySet<DeepReadonly<R>>
			: T extends Map<infer K, infer V>
				? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
				: // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
					T extends Function
					? T
					: T extends object
						? DeepReadonlyObject<T>
						: T;

type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
type Argument<T extends (...parameters: any) => unknown> = Parameters<T>[0];

/* eslint-disable  @typescript-eslint/no-explicit-any */
type Return<T extends (...args: any) => any> = T extends (
	...args: any
) => infer R
	? Awaited<R>
	: never;

export type { Argument, Return, DeepReadonly, DeepReadonlyObject };

export { nullToUndefined };
