import { AutoCompleteVersionState, TechniqueState } from './Technique';

export type SkillState = {
	id: number;
	level: number;
	technique: TechniqueState;
};

export type SkillCreateState = {
	techniqueFieldList: number[];
	autoCompleteTechniques: string[];
	autoCompleteVersions: Array<AutoCompleteVersionState>;
	handleChangeTechnique: (event: React.ChangeEvent<any>, index: number) => void;
	handleClickAddTechnique: () => void;
	handleClickDeleteTechnique: (value: number, index: number) => void;
	handleSubmit: (event: unknown) => void;
};
