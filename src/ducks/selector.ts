import { useSelector } from 'react-redux';
import { AboutStates } from '~/Type/About';
import { ProjectStates } from '~/Type/Project';
import { TechniqueStates, TechniqueTypeStates } from '~/Type/Technique';

export const useProjectStates = (): ProjectStates => {
	return useSelector((state: { projects: ProjectStates }) => state.projects);
};

export const useAboutState = (): AboutStates => {
	return useSelector((state: { abouts: AboutStates }) => state.abouts);
};

export const useTechniqueState = (): TechniqueStates => {
	return useSelector((state: { techniques: TechniqueStates }) => state.techniques);
};

export const useTechniqueTypeState = (): TechniqueTypeStates => {
	return useSelector((state: { techniqueTypes: TechniqueTypeStates }) => state.techniqueTypes);
};
