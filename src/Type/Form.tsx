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

export type AutoCompleteState = {
  index: number;
  label: string;
  name: string;
  required: boolean;
  length: number;
  url: boolean;
  date: boolean;
  value: string;
  autoCompletes: Array<{ name: string; type: string }>;
  placeholder: string;
  customStyle: Record<string | number | symbol, any>;
  handleChange: (event: React.ChangeEvent<any>, index: number) => void;
};

export type CustomSelectFieldState = {
  label: string;
  selectValue: Array<any>;
  editSelectValue: Array<any>;
  customStyle: Record<string | number | symbol, any>;
  handleClick: (values: string[]) => void;
};
