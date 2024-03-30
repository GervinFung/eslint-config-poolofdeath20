import { Defined } from './defined';
import { isNeitherNullNorUndefined } from './guard';

class Optional<T> {
	constructor(private readonly value: NonNullable<T> | null | undefined) {}

	static readonly some = <T>(value: T) => {
		if (isNeitherNullNorUndefined(value)) {
			return new Optional(value);
		}

		throw new Error('value is null or undefined');
	};

	static readonly none = <T>() => {
		return new Optional<T>(undefined);
	};

	static readonly from = <T>(value: T | null | undefined) => {
		return isNeitherNullNorUndefined(value)
			? Optional.some(value)
			: Optional.none<T>();
	};

	readonly isSome = () => {
		return isNeitherNullNorUndefined(this.value);
	};

	readonly isNone = () => {
		return !this.isSome();
	};

	readonly match = <R, F>(
		props: Readonly<{
			some: (value: NonNullable<T>) => R;
			none: () => F;
		}>
	) => {
		return this.isSome()
			? props.some(this.unwrapOrThrow('value is null or undefined'))
			: props.none();
	};

	readonly map = <R>(fn: (value: T) => NonNullable<R>) => {
		if (this.isSome()) {
			return new Optional(fn(this.value as NonNullable<T>));
		}

		return new Optional(undefined);
	};

	readonly flatMap = <R>(fn: (value: T) => Optional<NonNullable<R>>) => {
		if (this.isSome()) {
			return fn(this.value as NonNullable<T>);
		}

		return new Optional(undefined);
	};

	readonly ifSome = (fn: (value: NonNullable<T>) => void) => {
		if (this.isSome()) {
			fn(this.unwrapOrThrow('value is null or undefined'));
		}
	};

	readonly ifNone = (fn: () => void) => {
		if (this.isNone()) {
			fn();
		}
	};

	readonly unwrapOrGet = <T>(t: T) => {
		return Defined.parse(this.value).orGet(t);
	};

	readonly unwrapOrElse = <T>(fn: () => T) => {
		return Defined.parse(this.value).orElse(fn);
	};

	readonly unwrapOrThrow = <E extends Error>(error: E | string) => {
		return Defined.parse(this.value).orThrow(error);
	};
}

export { Optional };
