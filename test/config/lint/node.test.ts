import { describe, it, expect } from 'vitest';
import base from '../../../src/config/lint/base';
import { node } from '../../../src/config/lint/node';

describe('node config', () => {
	it('should assert that node config is correct', () => {
		expect(node).toStrictEqual(base);
	});
});
