import { Defined } from '../defined';

abstract class Result<T> {
	constructor(
		private readonly _props: Readonly<{
			data: NonNullable<T> | undefined;
			reason: Error | undefined;
		}>
	) {}

	protected readonly props = () => {
		return this._props;
	};

	readonly match = <S, F>(
		props: Readonly<{
			onSucceed: (data: NonNullable<T>) => S;
			onFailed: (reason: Error) => F;
		}>
	): S | F => {
		if (this.hadSucceed()) {
			return props.onSucceed(this.data());
		} else if (this.hadFailed()) {
			return props.onFailed(this.reason());
		}

		throw new Error('instance can only be either succeed or failed');
	};

	readonly map = <R>(
		fn: (data: NonNullable<T>) => NonNullable<R>
	): Result<R> => {
		if (this.hadSucceed()) {
			const data = fn(this.data());

			if (data instanceof Failed) {
				return Failed.create(data.reason());
			}

			return Succeed.create(data);
		}

		if (this.hadFailed()) {
			return Failed.create(this.reason());
		}

		throw new Error('instance can only be either succeed or failed');
	};

	readonly flatMap = <R>(
		fn: (data: NonNullable<T>) => Result<NonNullable<R>>
	): Result<R> => {
		if (this.hadSucceed()) {
			return fn(this.data());
		}

		if (this.hadFailed()) {
			return Failed.create(this.reason());
		}

		throw new Error('instance can only be either succeed or failed');
	};

	readonly hadSucceed = (): this is Succeed<T> => {
		return this instanceof Succeed;
	};

	readonly hadFailed = (): this is Failed => {
		return this instanceof Failed;
	};
}

class Succeed<T> extends Result<T> {
	private constructor(data: NonNullable<T>) {
		super({
			data,
			reason: undefined,
		});
	}

	readonly data = () => {
		return Defined.parse(this.props().data).orThrow('data is undefined');
	};

	static readonly create = <T>(data: NonNullable<T>): Succeed<T> => {
		return new this(data);
	};
}

class Failed extends Result<never> {
	private constructor(reason: Error) {
		super({
			reason,
			data: undefined,
		});
	}

	readonly reason = () => {
		return Defined.parse(this.props().reason).orThrow(
			'reason is undefined'
		);
	};

	static readonly create = (reason: string | Error) => {
		return new this(
			typeof reason === 'string' ? new Error(reason) : reason
		);
	};
}

class Operation {
	static readonly succeed = <T>(data: NonNullable<T>) => {
		return Succeed.create(data);
	};

	static readonly failed = (reason: string | Error) => {
		return Failed.create(reason);
	};
}

export { Operation, Result };
