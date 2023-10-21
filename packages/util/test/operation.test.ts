import { describe, expect, it } from 'vitest';
import { Operation } from '../src/operation';

describe('Operation structure', () => {
	it('should wrap result in operation', () => {
		const succeed = Operation.succeed(1);

		expect(succeed.hadSucceed).toBe(true);
		expect(succeed.data).toBe(1);

		const failed = Operation.failed('error');

		expect(failed.hadSucceed).toBe(false);
		expect(failed.reason).toBe('error');
	});
});
