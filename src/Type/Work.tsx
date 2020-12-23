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
