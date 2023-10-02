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

	for (const props in x) {
		if (
			!Object.prototype.hasOwnProperty.call(x, props) ||
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			Object.is(x[props], y[props])
		) {
			continue;
		}

		if (
			!Object.prototype.hasOwnProperty.call(y, props) ||
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			typeof x[props] !== 'object' ||
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			!equal(x[props], y[props])
		) {
			return false;
		}
	}

	for (const props in y) {
		if (
			Object.prototype.hasOwnProperty.call(y, props) &&
			!Object.prototype.hasOwnProperty.call(x, props)
		) {
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
