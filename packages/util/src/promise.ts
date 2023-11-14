const sleepInMilliseconds = <T>(
	props: Readonly<{
		milliseconds: number;
		callback?: () => Promise<T>;
	}>
) => {
	return new Promise<T>((resolve) => {
		return setTimeout(async () => {
			const value = await props.callback?.();
			if (value) {
				resolve(value);
			}
		}, props.milliseconds);
	});
};

const sleepInSeconds = <T>(
	props: Readonly<{
		seconds: number;
		callback?: () => Promise<T>;
	}>
) => {
	return new Promise<T>((resolve) => {
		return setTimeout(async () => {
			const value = await props.callback?.();
			if (value) {
				resolve(value);
			}
		}, props.seconds * 1000);
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
