import type { ConfigWithExtends } from 'typescript-eslint';

import { base } from './base';

const node = {
	...base,
} as const satisfies ConfigWithExtends;

export { node };
