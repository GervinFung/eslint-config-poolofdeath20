import { isNeitherNullNorUndefined } from './guard';

class Defined<T> {
	constructor(private readonly value: T) {}

	static readonly parse = <T>(value: T) => {
		return new this(value);
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
