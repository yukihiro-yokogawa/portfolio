import { useMemo } from 'react';
import Skill from '~/component/Skill/Skill';
import { useStoreState } from '~/ducks/selector';
import _ from 'lodash';

const skill: React.FC = () => {
	const { skills, techniqueTypes } = useStoreState();

	const mySkillsCreate = useMemo(() => {
		const mySkills = [];
		_(techniqueTypes).forEach((techniqueType) => {
			const mySkill = {};
			const skillsGroupByTechniqueType = _(skills)
				.filter((skill) => {
					return techniqueType.name === skill.technique.techniqueType.name;
				})
				.map((skill) => {
					return {
						name: `${skill.technique.name}${skill.technique.version === '' ? '' : ` ${skill.technique.version}`}`,
						level: skill.level,
					};
				})
				.value();
			mySkill['techniqueType'] = techniqueType.name;
			mySkill['techniques'] = skillsGroupByTechniqueType;
			mySkills.push(mySkill);
		});
		console.log(mySkills);
		return mySkills;
	}, [skills, techniqueTypes]);

	return (
		<>
			<Skill mySkills={mySkillsCreate} />
		</>
	);
};

export default skill;
