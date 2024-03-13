import { isNeitherNullNorUndefined } from './guard';

type Kind<T> = T | null | undefined;

class Defined<T> {
	constructor(private readonly value: Kind<T>) {}

	static readonly parse = <T>(value: Kind<T>) => {
		return new this(value);
	};

	readonly map = <R>(fn: (value: T) => NonNullable<R>) => {
		if (isNeitherNullNorUndefined(this.value)) {
			return new Defined(fn(this.value));
		}

		return new Defined<R>(undefined);
	};

	readonly orGet = <T>(t: T) => {
		return isNeitherNullNorUndefined(this.value) ? this.value : t;
	};

	readonly orElse = <T>(fn: () => T) => {
		return isNeitherNullNorUndefined(this.value) ? this.value : fn();
	};

	readonly orThrow = <E extends Error>(error: E | string) => {
		if (isNeitherNullNorUndefined(this.value)) {
			return this.value;
		}

		throw typeof error === 'string' ? new Error(error) : error;
	};
}

export { Defined };
