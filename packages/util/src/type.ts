import { isNotNull } from './guard';

const convertNullableToOptional = <T>(t: T | null) => {
	if (isNotNull(t)) {
		return t;
	}
	return undefined;
};

export { convertNullableToOptional };
