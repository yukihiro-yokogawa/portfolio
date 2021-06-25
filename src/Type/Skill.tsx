import { AutoCompleteVersionState, TechniqueState } from "./Technique";

export type SkillStates = { skills: Array<SkillState> };

export type SkillState = {
  id: number;
  level: number;
  deleted: boolean;
  technique: TechniqueState;
};

export type SkillCreateState = {
  autoCompleteTechniques: Array<{ name: string; type: string }>;
  autoCompleteVersions: Array<AutoCompleteVersionState>;
  handleChangeTechnique: (event: React.ChangeEvent<any>, index: number) => void;
  handleSubmit: (event: unknown) => void;
};
