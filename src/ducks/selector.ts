import { useSelector, shallowEqual } from 'react-redux';
import { AboutStates } from '~/Type/About';
import { ProjectStates } from '~/Type/Project';
import { SkillState } from '~/Type/Skill';
import { TechniqueStates, TechniqueTypeStates } from '~/Type/Technique';

export const useSkillStates = (): Array<SkillState> => {
	return useSelector((state: Array<SkillState>) => state);
};

export const useProjectStates = (): ProjectStates => {
	return useSelector((state: { projects: ProjectStates }) => state.projects, shallowEqual);
};

export const useAboutState = (): AboutStates => {
	return useSelector((state: { abouts: AboutStates }) => state.abouts, shallowEqual);
};

export const useTechniqueState = (): TechniqueStates => {
	return useSelector((state: { techniques: TechniqueStates }) => state.techniques, shallowEqual);
};

export const useTechniqueTypeState = (): TechniqueTypeStates => {
	return useSelector((state: { techniqueTypes: TechniqueTypeStates }) => state.techniqueTypes, shallowEqual);
};
