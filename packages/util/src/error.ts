const processErrorMessage = (error: unknown) => {
	return typeof error === 'string'
		? error
		: error instanceof Error
		  ? error.message
		  : JSON.stringify(error);
};

export { processErrorMessage };
