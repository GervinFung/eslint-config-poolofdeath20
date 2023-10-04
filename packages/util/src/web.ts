import { isFalse, isTruthy } from './boolean';
import { isNeitherNullNorUndefined } from './guard';

declare global {
	interface ArrayConstructor {
		isArray(
			arg: ReadonlyArray<unknown> | unknown
		): arg is ReadonlyArray<unknown>;
	}
}

const isBrowser = () => {
	return typeof window !== 'undefined';
};

type Mode = ReturnType<typeof getPreferredMode>;

const getPreferredMode = () => {
	if (isFalse(isBrowser())) {
		return 'dark';
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
};

type FormQueryParamUnit = string | number | boolean | undefined | null;

const formQueryParamStringFromRecord = (
	params: Readonly<{
		[key: string]: FormQueryParamUnit | ReadonlyArray<FormQueryParamUnit>;
	}>
) => {
	return Object.entries(params)
		.flatMap(([key, value]) => {
			return !isNeitherNullNorUndefined(value)
				? []
				: [[key, value] as const];
		})
		.map(([key, value]) => {
			return `${key}=${encodeURIComponent(
				!Array.isArray(value) ? value : value.filter(isTruthy).join(',')
			)}`;
		})
		.join('&');
};

const formQueryParamRecordFromString = (queryParam: string) => {
	return queryParam
		.split('&')
		.map((queryParamUnit) => {
			return queryParamUnit.split('=');
		})
		.flatMap(([key, value]) => {
			return !(
				isNeitherNullNorUndefined(key) &&
				isNeitherNullNorUndefined(value)
			)
				? []
				: [[key, value] as const];
		})
		.map(([key, value]) => {
			const decodedValue = decodeURIComponent(value);

			return {
				key,
				value: decodedValue.includes(',')
					? decodedValue.split(',')
					: decodedValue,
			};
		})
		.reduce(
			(record, { key, value }) => {
				return {
					...record,
					[key]: value,
				};
			},
			{} as Readonly<{
				[key: string]: string | ReadonlyArray<string>;
			}>
		);
};

export type { Mode };
export {
	isBrowser,
	getPreferredMode,
	formQueryParamStringFromRecord,
	formQueryParamRecordFromString,
};
