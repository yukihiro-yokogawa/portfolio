export type Work = {
	projectId: number;
	projectName: string;
	sampleImgPathArr: Array<string>;
	gitUrl: string;
	techniqueArr: Array<Technique>;
	feature: string /**機能*/;
	point: string /**工夫点*/;
	reflections: string /**反省点*/;
};
export type Technique = {
	techniqueName: string;
	version: string;
};
