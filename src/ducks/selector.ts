import { useSelector } from 'react-redux';
import { AboutStates } from '~/Type/About';
import { ProjectStates } from '~/Type/Project';

export const useProjectState = (): ProjectStates => {
	return useSelector((state: { projects: ProjectStates }) => state.projects);
};

export const useAboutState = (): AboutStates => {
	return useSelector((state: { abouts: AboutStates }) => state.abouts);
};
