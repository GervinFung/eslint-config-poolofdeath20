// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Empty {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	static readonly of = () => {
		return new this();
	};

	static readonly isEmpty = (t: unknown): t is Empty => {
		return t instanceof Empty;
	};

	static readonly isNotEmpty = <T>(t: T | Empty): t is T => {
		return !this.isEmpty(t);
	};
}

export { Empty };
