const sleepInMilliseconds = <T>(
	props: Readonly<{
		milliseconds: number;
		callback?: () => Promise<T>;
	}>
) => {
	return new Promise<T>((resolve) =>
		setTimeout(async () => {
			const value = await props.callback?.();
			if (value) {
				resolve(value);
			}
		}, props.milliseconds)
	);
};

const sleepInSeconds = <T>(
	props: Readonly<{
		seconds: number;
		callback?: () => Promise<T>;
	}>
) => {
	return new Promise<T>((resolve) =>
		setTimeout(async () => {
			const value = await props.callback?.();
			if (value) {
				resolve(value);
			}
		}, props.seconds * 1000)
	);
};

export { sleepInMilliseconds, sleepInSeconds };
