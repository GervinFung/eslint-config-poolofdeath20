const nullToUndefined = <T>(value: T | null) => {
	return value ?? undefined;
};

type Func = (...parameters: ReadonlyArray<unknown>) => unknown;

type DeepReadonly<T> =
	T extends Array<infer R>
		? ReadonlyArray<DeepReadonly<R>>
		: T extends Set<infer R>
			? ReadonlySet<DeepReadonly<R>>
			: T extends Map<infer K, infer V>
				? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
				: T extends Func
					? T
					: T extends object
						? DeepReadonlyObject<T>
						: T;

type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type Argument<T extends Func> = Parameters<T>[0];

type Return<T extends Func> = T extends (
	...parameters: ReadonlyArray<unknown>
) => infer R
	? Awaited<R>
	: never;

export type { Argument, Return, DeepReadonly, DeepReadonlyObject };

export { nullToUndefined };
