import { Defined } from '../defined';

type Promisified<T> = Promise<NonNullable<T>>;

abstract class AsyncResult<T> {
	constructor(
		private readonly _props: Readonly<{
			data: NonNullable<T> | undefined;
			reason: Error | undefined;
		}>
	) {}

	protected readonly props = () => {
		return this._props;
	};

	readonly toJson = async (): Promise<
		Readonly<
			| {
					hadSucceed: true;
					data: T;
			  }
			| {
					hadSucceed: false;
					reason: Error;
			  }
		>
	> => {
		if (this.hadFailed()) {
			return {
				hadSucceed: false,
				reason: this.reason(),
			};
		}

		if (this.hadSucceed()) {
			return {
				hadSucceed: true,
				data: await this.data(),
			};
		}

		throw new Error('instance can only be either succeed or failed');
	};

	readonly match = <S, F>(
		props: Readonly<{
			succeed: (data: NonNullable<T>) => S;
			failed: (reason: Error) => F;
		}>
	) => {
		if (this.hadSucceed()) {
			return props.succeed(this.data());
		} else if (this.hadFailed()) {
			return props.failed(this.reason());
		}

		throw new Error('instance can only be either succeed or failed');
	};

	readonly map = async <R>(
		fn: (data: T) => Promisified<R>
	): Promise<AsyncResult<R>> => {
		if (this.hadSucceed()) {
			const data = await fn(this.data());

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

	readonly flatMap = async <R>(
		fn: (data: T) => Promisified<AsyncResult<R>>
	): Promise<AsyncResult<R>> => {
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

class Succeed<T> extends AsyncResult<T> {
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

class Failed extends AsyncResult<never> {
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

class AsyncOperation {
	static readonly succeed = <T>(data: NonNullable<T>) => {
		return Succeed.create(data);
	};

	static readonly failed = (reason: string | Error) => {
		return Failed.create(reason);
	};
}

export { AsyncOperation, AsyncResult };
