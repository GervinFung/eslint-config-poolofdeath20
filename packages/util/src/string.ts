const isBlank = (string: string) => {
	return string.split('').every((char) => {
		return char === ' ';
	});
};

const isEmpty = (string: string) => {
	return !string;
};

const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export { capitalize, isBlank, isEmpty };
