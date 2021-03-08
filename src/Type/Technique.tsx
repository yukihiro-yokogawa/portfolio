export type TechniqueStates = {
	techniques: Array<TechniqueState>;
};

export type TechniqueState = {
	id: number;
	name: string;
	version: string;
	techniqueType: TechniqueTypeState;
};

export type TechniqueTypeState = {
	id: number;
	name: string;
	displayOrder: number;
};

export type AutoCompleteVersionState = {
	id: number;
	autoComplete: Array<{ id: number; name: string; type: string }>;
};
