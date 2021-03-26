import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Create from '~/container/Skill/Create';
import { getSkillsAsync } from '~/ducks/Slice/SkillSlice';
import { getTechniquesAsync } from '~/ducks/Slice/TechniqueSlice';
import { getTechniqueTypeAsync } from '~/ducks/Slice/TechniqueTypeSlice';
import _ from 'lodash';

export const SkillsContext: React.Context<Array<any>> = createContext([
	{
		techniques: [
			{
				name: '',
				level: null,
			},
		],
		techniqueType: {
			id: 0,
			name: '',
			displayOrder: 0,
		},
	},
]);

const create = (props: { skills: Array<any> }): JSX.Element => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTechniquesAsync());
		dispatch(getTechniqueTypeAsync());
		dispatch(getSkillsAsync());
	}, [dispatch]);

	return (
		<SkillsContext.Provider value={props.skills.length != 0 ? props.skills : useContext(SkillsContext)}>
			<div>
				<Create />
			</div>
		</SkillsContext.Provider>
	);
};

export default create;

create.getInitialProps = async ({ query }) => {
	const skills = _(JSON.parse(query.param))
		.filter((skill) => {
			return skill.techniques.length != 0;
		})
		.map((skill) => {
			return skill.techniques;
		})
		.value();
	console.log(_.flattenDeep(skills));
	return { skills: query.param == 'new' ? [] : JSON.parse(query.param) };
};
