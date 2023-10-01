const Bool = (boolean: boolean) => {
	return {
		isFalse: !boolean,
		isTrue: boolean,
	};
};

export { Bool };
