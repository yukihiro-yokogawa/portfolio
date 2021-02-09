export type CustomInputState = {
	label: string;
	name: string;
	required: boolean;
	length: number;
	url: boolean;
	date: boolean;
	value: string | Array<string>;
	placeholder: string;
	customStyle: Record<string | number | symbol, any>;
};

export type CustomSelectFieldState = {
	label: string;
	selectValue: Array<any>;
	editSelectValue: Array<any>;
	customStyle: Record<string | number | symbol, any>;
	handleClick: (values: string[]) => void;
};
