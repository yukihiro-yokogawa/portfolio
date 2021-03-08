import { AutoCompleteVersionState } from './Technique';

export type WorkStates = {
	work: Array<WorkState>;
	handleClick: (arg1: number) => void;
};

export type WorkState = {
	projectId: number;
	projectName: string;
	sampleImgPathArr: Array<string>;
	gitUrl: string;
	techniqueArr: Array<TechniqueState>;
	feature: string /**機能*/;
	point: string /**工夫点*/;
	reflections: string /**反省点*/;
};

export type TechniqueState = {
	techniqueName: string;
	version: string;
};

export type WorkCreateState = {
	abouts: string[];
	techniqueFieldList: number[];
	aboutFieldList: string[];
	autoCompleteTechniques: { name: string; type: string }[];
	autoCompleteVersions: Array<AutoCompleteVersionState>;
	handleChangeTechnique: (event: React.ChangeEvent<any>, index: number) => void;
	handleClickAddTechnique: () => void;
	handleClickDeleteTechnique: (value: number, index: number) => void;
	handleClickAddAbout: (values: string[]) => void;
	handleSubmit: (event: unknown) => void;
};
