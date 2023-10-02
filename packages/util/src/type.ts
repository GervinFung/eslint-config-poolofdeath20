import { isNotNull } from './guard';

const convertNullableToOptional = <T>(value: T | null) => {
	if (isNotNull(value)) {
		return value;
	}
	return undefined;
};

export { convertNullableToOptional };
