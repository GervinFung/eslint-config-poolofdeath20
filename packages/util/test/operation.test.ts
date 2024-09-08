import { describe, expect, it } from 'vitest';

import { Operation, AsyncOperation } from '../src/operation';

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

			expect(
				Operation.succeed(1).match({
					succeed: (number) => {
						return number + 2;
					},
					failed: (reason) => {
						return {
							reason,
						};
					},
				})
			).toBe(3);

			expect(result.hadFailed()).toBe(output.hasFailed);
			expect(result.hadSucceed()).toBe(!output.hasFailed);
		}
	);
});

describe('Promisified Operation structure', () => {
	it('should wrap result in operation', async () => {
		const succeed = AsyncOperation.succeed(Promise.resolve(1));

		expect(succeed.hadSucceed()).toBe(true);
		expect(await succeed.data()).toBe(1);

		const stringFailed = AsyncOperation.failed('error');

		expect(stringFailed.hadSucceed()).toBe(false);
		expect(stringFailed.reason()).toBeInstanceOf(Error);

		const errorFailed = AsyncOperation.failed(new Error('error'));

		expect(
			errorFailed.match({
				succeed: () => {
					return false;
				},
				failed: () => {
					return true;
				},
			})
		).toBe(true);
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
		async ({ input, output }) => {
			const result = await (
				input
					? AsyncOperation.succeed(1)
					: AsyncOperation.failed('error')
			)
				.flatMap(() => {
					return Promise.resolve(AsyncOperation.succeed(2));
				})
				.then((value) => {
					return value.flatMap(() => {
						return Promise.resolve(AsyncOperation.succeed(2));
					});
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
			input: AsyncOperation.succeed('hi'),
			output: {
				hasFailed: false,
			},
		},
		{
			input: AsyncOperation.failed('error'),
			output: {
				hasFailed: true,
			},
		},
	])(
		'should conditionally invoke different path depending on result status',
		async ({ input, output }) => {
			const result = await AsyncOperation.succeed(1).map(() => {
				return Promise.resolve(input);
			});

			expect(result.hadFailed()).toBe(output.hasFailed);
			expect(result.hadSucceed()).toBe(!output.hasFailed);
		}
	);
});
