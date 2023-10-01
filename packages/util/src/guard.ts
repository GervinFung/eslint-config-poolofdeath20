const isNotNull = <T>(t: T | null): t is Readonly<Exclude<T, null>> => {
	return t !== null;
};

const isNotUndefined = <T>(
	t: T | undefined
): t is Readonly<Exclude<T, undefined>> => {
	return t !== undefined;
};

const isNeitherNullNorUndefined = <T>(
	t: T | null | undefined
): t is NonNullable<T> => {
	return t !== undefined && t !== null;
};

const isTruthy = <T>(t: T) => {
	return Boolean(t);
};

const isFalsy = <T>(t: T) => {
	return !t;
};

const guardAsDefined = <T, Err extends Error>(
	props: Readonly<{
		value: T | null | undefined;
		error: Err;
	}>
) => {
	if (isNeitherNullNorUndefined(props.value)) {
		return props.value;
	}
	throw props.error;
};

export {
	isNotNull,
	isNotUndefined,
	isNeitherNullNorUndefined,
	isTruthy,
	isFalsy,
	guardAsDefined,
};
