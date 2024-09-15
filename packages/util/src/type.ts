const nullToUndefined = <T>(value: T | null) => {
	return value ?? undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Function = (...parameters: any) => unknown;

type DeepReadonly<T> =
	T extends Array<infer R>
		? ReadonlyArray<DeepReadonly<R>>
		: T extends Set<infer R>
			? ReadonlySet<DeepReadonly<R>>
			: T extends Map<infer K, infer V>
				? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
				: T extends Function
					? T
					: T extends object
						? DeepReadonlyObject<T>
						: T;

type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type Argument<T extends Function> = Parameters<T>[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Return<T extends Function> = T extends (...parameters: any) => infer R
	? Awaited<R>
	: never;

export type { Argument, Return, DeepReadonly, DeepReadonlyObject };

export { nullToUndefined };
