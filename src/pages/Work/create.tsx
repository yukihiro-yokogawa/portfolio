import React, { createContext, useContext, useEffect } from 'react';
import Create from '~/container/Work/Create';
import { getAboutsAsync } from '~/ducks/Slice/AboutSlice';
import { useDispatch } from 'react-redux';
import { getTechniquesAsync } from '~/ducks/Slice/TechniqueSlice';
import { getTechniqueTypeAsync } from '~/ducks/Slice/TechniqueTypeSlice';

import { ProjectState } from '~/Type/Project';
/** @type {コンテキスト（ProjectState} */
export const ProjectContext: React.Context<ProjectState> = createContext({
	id: 0,
	name: '',
	startDate: '',
	endDate: '',
	addDate: '',
	gitUrl: '',
	projectTechniques: [],
	projectAbouts: [],
	projectImages: [],
});

const create = (props: { project: ProjectState }): JSX.Element => {
	const dispatch = useDispatch();
	// レンダリング後に実行されるアクション関数.
	useEffect(() => {
		dispatch(getAboutsAsync());
		dispatch(getTechniquesAsync());
		dispatch(getTechniqueTypeAsync());
	}, [dispatch]);

	return (
		<ProjectContext.Provider value={Object.keys(props.project).length != 0 ? props.project : useContext(ProjectContext)}>
			<div>
				<Create />
			</div>
		</ProjectContext.Provider>
	);
};

export default create;

create.getInitialProps = async ({ query }) => {
	return { project: query.param == 'new' ? [] : JSON.parse(query.param) };
};
