import { describe, it, expect } from 'vitest';
import base from '../src/base';
import { node } from '../src/node';

describe('node config', () => {
	it('should assert that node config is correct', () => {
		expect(node).toStrictEqual(base);
	});
});
