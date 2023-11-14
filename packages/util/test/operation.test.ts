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

	it.each([
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
			)
				.flatMap(() => {
					return Operation.succeed(2);
				})
				.flatMap(() => {
					return Operation.succeed(2);
				});

			expect(
				result.hadFailed() ? result.reason().message : undefined
			).toBe(output.isError ? 'error' : undefined);

			expect(result.hadSucceed() ? result.data() : undefined).toBe(
				output.isError ? undefined : 2
			);
		}
	);

	it.each([
		{
			input: Operation.succeed('hi'),
			output: {
				hasFailed: false,
			},
		},
		{
			input: Operation.failed('error'),
			output: {
				hasFailed: true,
			},
		},
	])(
		'should conditionally invoke different path depending on result status',
		({ input, output }) => {
			const result = Operation.succeed(1).map(() => {
				return input;
			});

			expect(result.hadFailed()).toBe(output.hasFailed);
			expect(result.hadSucceed()).toBe(!output.hasFailed);
		}
	);
});
