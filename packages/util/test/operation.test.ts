import { describe, expect, it } from 'vitest';
import { Operation } from '../src/operation';

describe('Operation structure', () => {
	it('should wrap result in operation', () => {
		const succeed = Operation.succeed(1);

		expect(succeed.hadSucceed).toBe(true);
		expect(succeed.data).toBe(1);

		const stringFailed = Operation.failed('error');

		expect(stringFailed.hadSucceed).toBe(false);
		expect(stringFailed.reason).toBe('error');

		const errorFailed = Operation.failed(new Error('error'));

		expect(errorFailed.hadSucceed).toBe(false);
		expect(errorFailed.reason).toBeInstanceOf(Error);
	});
});
