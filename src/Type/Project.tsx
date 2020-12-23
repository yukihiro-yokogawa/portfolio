import { Technique } from '~/Type/Technique';
import { About } from '~/Type/About';

export type projects = {
	project: Array<Project>;
};

type Project = {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	addDate: string;
	projectTechniques: Array<ProjectTechnique>;
	projectAbouts: Array<ProjectAbout>;
	projectImages: Array<ProjectImage>;
};

type ProjectTechnique = {
	id: number;
	technique: Technique;
};

type ProjectAbout = {
	id: number;
	description: string;
	displayPrder: number;
	about: About;
};

type ProjectImage = {
	id: number;
	image: string;
};
