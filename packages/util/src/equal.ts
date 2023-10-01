const equal = (x: unknown, y: unknown) => {
	if (Object.is(x, y)) {
		return true;
	}

	if (
		!(x instanceof Object) ||
		!(y instanceof Object) ||
		x.constructor !== y.constructor
	) {
		return false;
	}

	for (const p in x) {
		// eslint-disable-next-line no-ts-ignore
		// @ts-ignore
		if (!x.hasOwnProperty(p) || Object.is(x[p], y[p])) {
			continue;
		}

		if (
			!y.hasOwnProperty(p) ||
			// eslint-disable-next-line no-ts-ignore
			// @ts-ignore
			typeof x[p] !== 'object' ||
			// eslint-disable-next-line no-ts-ignore
			// @ts-ignore
			!equal(x[p], y[p])
		) {
			return false;
		}
	}

	for (const p in y) {
		if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
			return false;
		}
	}

	return true;
};

interface Equal {
	isEqual: <Child extends Equal>(child: Child) => boolean;
}

export { equal };
export type { Equal };
