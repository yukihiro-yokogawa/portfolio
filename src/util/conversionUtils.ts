const getDateString = (date: string): string => {
	return date == '' ? date : date?.match(/^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])/)[0];
};

export { getDateString };
