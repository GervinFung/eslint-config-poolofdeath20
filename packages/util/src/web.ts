import { isFalse } from './boolean';

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

export type { Mode };
export { isBrowser, getPreferredMode };
