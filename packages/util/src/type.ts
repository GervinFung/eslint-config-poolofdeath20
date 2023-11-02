const nullToUndefined = <T>(value: NonNullable<T> | null) => {
	return value ?? undefined;
};

type DeepReadonly<T> = T extends (infer R)[]
	? ReadonlyArray<DeepReadonly<R>>
	: T extends Set<infer R>
	? ReadonlySet<DeepReadonly<R>>
	: T extends Function
	? T
	: T extends object
	? DeepReadonlyObject<T>
	: T;

type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type { DeepReadonly, DeepReadonlyObject };

export { nullToUndefined };
