import { getPreferredMode, isBrowser } from '../../src/web';

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		isBrowser: ReturnType<typeof isBrowser>;
		getPreferredMode: ReturnType<typeof getPreferredMode>;
	}
}

window.isBrowser = isBrowser();
window.getPreferredMode = getPreferredMode();
