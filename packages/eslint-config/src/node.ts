import type { ConfigWithExtends } from 'typescript-eslint';

import { base } from './base';

const node: ConfigWithExtends = {
	...base,
};

export { node };
