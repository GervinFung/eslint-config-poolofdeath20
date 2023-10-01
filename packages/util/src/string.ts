const isBlank = (s: string) => {
	return s.split('').every((char) => {
		return char === ' ';
	});
};

const isEmpty = (s: string) => {
	return !s;
};

const capitalize = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export { capitalize, isBlank, isEmpty };
