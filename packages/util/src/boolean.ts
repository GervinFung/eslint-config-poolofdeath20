const isFalse = (boolean: boolean) => {
	return !boolean;
};

const isTruthy = <T>(value: T) => {
	return Boolean(value);
};

const isFalsy = <T>(value: T) => {
	return !value;
};

export { isFalse, isTruthy, isFalsy };
