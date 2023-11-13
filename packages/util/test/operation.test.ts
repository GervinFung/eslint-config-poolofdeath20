import { describe, expect, it } from 'vitest';
import { Operation } from '../src/operation';

describe('Operation structure', () => {
	it('should wrap result in operation', () => {
		const succeed = Operation.succeed(1);

		expect(succeed.hadSucceed()).toBe(true);
		expect(succeed.data()).toBe(1);

		const stringFailed = Operation.failed('error');

		expect(stringFailed.hadSucceed()).toBe(false);
		expect(stringFailed.reason()).toBeInstanceOf(Error);

		const errorFailed = Operation.failed(new Error('error'));

		expect(errorFailed.hadSucceed()).toBe(false);
		expect(errorFailed.reason()).toBeInstanceOf(Error);
	});

	it.only.each([
		{
			input: true,
			output: {
				isError: false,
			},
		},
		{
			input: false,
			output: {
				isError: true,
			},
		},
	])(
		'should conditionally invoke different path depending on result status',
		({ input, output }) => {
			const result = (
				input ? Operation.succeed(1) : Operation.failed('error')
			).whenSucceed(() => {
				return Operation.succeed(2);
			});

			expect(result.hadFailed()).toBe(output.isError);
			expect(result.hadSucceed()).toBe(!output.isError);
		}
	);
});
