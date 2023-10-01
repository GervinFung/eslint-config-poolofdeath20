class Empty {
	private constructor() {}

	static readonly of = () => {
		return new this();
	};

	static readonly isEmpty = <T>(t: T | Empty): t is Empty => {
		return t instanceof Empty;
	};

	static readonly isNotEmpty = <T>(t: T | Empty): t is T => {
		return !this.isEmpty(t);
	};
}

export { Empty };
