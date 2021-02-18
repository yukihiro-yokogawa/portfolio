import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Skill from '~/component/Skill/Skill';
import { useSkillStates } from '~/ducks/selector';
import { getSkillsAsync } from '~/ducks/Slice/SkillSlice';
import { getTechniqueTypeAsync } from '~/ducks/Slice/TechniqueTypeSlice';

const skill: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTechniqueTypeAsync());
		dispatch(getSkillsAsync());
	}, [dispatch]);

	console.log(useSkillStates());

	return (
		<>
			<Skill />
		</>
	);
};

export default skill;
