import { TechniqueState } from '~/Type/Technique';
import { AboutState } from '~/Type/About';

export type ProjectStates = {
	project: Array<ProjectState>;
};

type ProjectState = {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	addDate: string;
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
	displayPrder: number;
	about: AboutState;
};

type ProjectImageState = {
	id: number;
	image: string;
};
