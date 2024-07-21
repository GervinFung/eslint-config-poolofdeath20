import { Optional } from '.';

type Callback<T> = undefined | (() => Promise<T>);

const sleepInMilliseconds = <T>(
	props: Readonly<{
		milliseconds: number;
		callback?: Callback<T>;
	}>
) => {
	return new Promise<Optional<T>>((resolve) => {
		return setTimeout(async () => {
			const value = Optional.from(await props.callback?.());
			resolve(value);
		}, props.milliseconds);
	});
};

const sleepInSeconds = <T>(
	props: Readonly<{
		seconds: number;
		callback?: Callback<T>;
	}>
) => {
	return sleepInMilliseconds({
		milliseconds: props.seconds * 1000,
		callback: props.callback,
	});
};

const sequentialPromise = <T>(promises: ReadonlyArray<() => Promise<T>>) => {
	return promises.reduce(
		async (previousPromise, currentPromise) => {
			return previousPromise.then(async (previousResult) => {
				return previousResult.concat(await currentPromise());
			});
		},
		Promise.resolve([] as ReadonlyArray<T>)
	);
};

export { sleepInMilliseconds, sleepInSeconds, sequentialPromise };
