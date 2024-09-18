const nullToUndefined = <T>(value: T | null) => {
	return value ?? undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...parameters: any) => unknown;

type MapLike<K, V> = Map<K, V> | ReadonlyMap<K, V>;

type SetLike<V> = Set<V> | ReadonlySet<V>;

type ArrayLike<T> = Array<T> | ReadonlyArray<T>;

type Tuple<T> = T extends [any, ...any] ? T : never;

type DeepReadonlyObject<T> = Readonly<{
	[Key in keyof T]: DeepReadonly<T[Key]>;
}>;

type Native =
	| string
	| number
	| boolean
	| bigint
	| symbol
	| undefined
	| null
	| Function
	| Date
	| RegExp;

type DeepReadonly<T> = T extends Native
	? T
	: T extends MapLike<infer K, infer V>
		? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
		: T extends SetLike<infer V>
			? ReadonlySet<DeepReadonly<V>>
			: T extends Promise<infer V>
				? Promise<DeepReadonly<V>>
				: T extends ArrayLike<infer V>
					? T extends Tuple<infer V>
						? DeepReadonlyObject<V>
						: ReadonlyArray<DeepReadonly<V>>
					: T extends object
						? DeepReadonlyObject<T>
						: Readonly<T>;

type Argument<T extends Fn> = Parameters<T>[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Return<T extends Fn> = T extends (...parameters: any) => infer R
	? Awaited<R>
	: never;

export type { Argument, Return, DeepReadonly, DeepReadonlyObject };

export { nullToUndefined };
