import { AboutState } from './About';
import { NetworkState } from './Network';
import { ProjectState } from './Project';
import { SkillState } from './Skill';
import { TechniqueState, TechniqueTypeState } from './Technique';

export type PortFolioState = {
	skills: Array<SkillState>;
	projects: Array<ProjectState>;
	abouts: Array<AboutState>;
	techniques: Array<TechniqueState>;
	techniqueTypes: Array<TechniqueTypeState>;
	network: NetworkState;
};
