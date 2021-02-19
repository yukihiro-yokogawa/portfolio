import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Create from '~/container/Skill/Create';
import { getSkillsAsync } from '~/ducks/Slice/SkillSlice';
import { getTechniquesAsync } from '~/ducks/Slice/TechniqueSlice';
import { getTechniqueTypeAsync } from '~/ducks/Slice/TechniqueTypeSlice';
const create: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTechniquesAsync());
		dispatch(getTechniqueTypeAsync());
		dispatch(getSkillsAsync());
	}, [dispatch]);

	return (
		<div>
			<Create />
		</div>
	);
};

export default create;
