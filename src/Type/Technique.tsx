export type TechniqueStates = {
	techniques: Array<TechniqueState>;
};

export type TechniqueState = {
	id: number;
	name: string;
	version: string;
	techniqueType: TechniqueTypeState;
};

type TechniqueTypeState = {
	id: number;
	name: string;
	displayOrder: number;
};
