import { describe, expect, it } from 'vitest';
import { Bool } from '../src/boolean';

describe('A boolean wrapper with a function that should be able to determines whether it is true/false', () => {
	it('should assert if a boolean value is true/false', () => {
		expect(Bool(true).isTrue).toBe(true);
		expect(Bool(true).isFalse).toBe(false);

		expect(Bool(false).isFalse).toBe(true);
		expect(Bool(false).isTrue).toBe(false);
	});
});
