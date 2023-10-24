class Operation {
	static readonly succeed = <T>(data: NonNullable<T>) => {
		return {
			data,
			hadSucceed: true,
		} as const;
	};

	static readonly failed = (reason: string | Error) => {
		return {
			reason,
			hadSucceed: false,
		} as const;
	};
}

export { Operation };
