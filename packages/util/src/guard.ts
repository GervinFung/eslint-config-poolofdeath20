const isNotNull = <T>(value: T | null): value is Readonly<Exclude<T, null>> => {
	return value !== null;
};

const isNotUndefined = <T>(
	value: T | undefined
): value is Readonly<Exclude<T, undefined>> => {
	return value !== undefined;
};

const isNeitherNullNorUndefined = <T>(
	value: T | null | undefined
): value is NonNullable<T> => {
	return value !== undefined && value !== null;
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

export { isNotNull, isNotUndefined, isNeitherNullNorUndefined, guardAsDefined };
