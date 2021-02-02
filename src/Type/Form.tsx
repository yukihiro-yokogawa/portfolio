export type CustomInputState = {
	label: string;
	required: boolean;
	length: number;
	url: boolean;
	placeholder: string;
	customStyle: Record<string | number | symbol, any>;
};

export type CustomSelectFieldState = {
	label: string;
	selectValue: Array<any>;
	customStyle: Record<string | number | symbol, any>;
	handleClick: (values: string[]) => void;
};
