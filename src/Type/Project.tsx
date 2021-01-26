import { TechniqueState } from '~/Type/Technique';
import { AboutState } from '~/Type/About';

export type ProjectStates = {
	projects: Array<ProjectState>;
};

export type ProjectState = {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	addDate: string;
	gitUrl: string;
	projectTechniques: Array<ProjectTechniqueState>;
	projectAbouts: Array<ProjectAboutState>;
	projectImages: Array<ProjectImageState>;
};

type ProjectTechniqueState = {
	id: number;
	technique: TechniqueState;
};

type ProjectAboutState = {
	id: number;
	description: string;
	displayOrder: number;
	about: AboutState;
};

export type ProjectImageState = {
	id: number;
	image: string;
};
