import { isNeitherNullNorUndefined } from './guard';

type Kind<T> = T | null | undefined;

class Defined<T> {
	constructor(private readonly value: Kind<T>) {}

	static readonly parse = <T>(value: Kind<T>) => {
		return new this(value);
	};

	private readonly isSome = () => {
		return isNeitherNullNorUndefined(this.value);
	};

	readonly map = <R>(fn: (value: T) => NonNullable<R>) => {
		if (this.isSome()) {
			return new Defined(fn(this.value as T));
		}

		return new Defined<R>(undefined);
	};

	readonly ifDefined = (fn: (value: NonNullable<T>) => void) => {
		if (this.isSome()) {
			fn(this.orThrow('value is null or undefined'));
		}
	};

	readonly orGet = <T>(t: T) => {
		return isNeitherNullNorUndefined(this.value) ? this.value : t;
	};

	readonly orElse = <T>(fn: () => T) => {
		return isNeitherNullNorUndefined(this.value) ? this.value : fn();
	};

	readonly orThrow = (error: Error | string) => {
		if (isNeitherNullNorUndefined(this.value)) {
			return this.value;
		}

		throw typeof error === 'string' ? new Error(error) : error;
	};
}

export { Defined };
