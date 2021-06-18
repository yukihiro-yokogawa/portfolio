import { AutoCompleteVersionState, TechniqueState } from "./Technique";

export type SkillStates = { skills: Array<SkillState> };

export type SkillState = {
  id: number;
  level: number;
  deleted: boolean;
  technique: TechniqueState;
};

export type SkillCreateState = {
  techniqueFieldList: number[];
  autoCompleteTechniques: Array<{ name: string; type: string }>;
  autoCompleteVersions: Array<AutoCompleteVersionState>;
  handleChangeTechnique: (event: React.ChangeEvent<any>, index: number) => void;
  handleClickAddTechnique: () => void;
  handleClickDeleteTechnique: (value: number, index: number) => void;
  handleSubmit: (event: unknown) => void;
};
