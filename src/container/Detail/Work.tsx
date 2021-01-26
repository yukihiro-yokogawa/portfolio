import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Work from '~/component/Detail/Work';
import Slideshow from '~/component/Slideshow';
import SideBar from '~/container/SideBar';
import { filter } from 'lodash';
import { ProjectState } from '~/Type/Project';
import { getProjectsAsync } from '~/ducks/ProjectSlice';
import { useProjectState } from '~/ducks/selector';

const work = (): JSX.Element => {
	// dispatch関数 アクションクリエイターで実装されるアクションを実行させる.
	const dispatch = useDispatch();

	// useEffectでアクションを実行させる関数をdispatchすることで再レンダリングされる.
	useEffect(() => {
		dispatch(getProjectsAsync());
	}, [dispatch]);

	const { projects } = useProjectState();
	const [projectState, setProjectState] = useState<ProjectState>();

	const handleClickSideBar = (projectId: number) => {
		const project: ProjectState = filter(projects, (value) => {
			return value.id == projectId;
		});
		setProjectState({
			...projectState,
			id: project[0].id,
			name: project[0].name,
			startDate: project[0].startDate,
			endDate: project[0].endDate,
			addDate: project[0].addDate,
			gitUrl: project[0].gitUrl,
			projectTechniques: project[0].projectTechniques,
			projectAbouts: project[0].projectAbouts,
			projectImages: project[0].projectImages,
		});
	};

	return (
		<div>
			<SideBar projects={projects} sideBar={null} handleClick={(projectId: number) => handleClickSideBar(projectId)} />
			<Slideshow imgs={projectState?.projectImages} />
			<Work project={projectState} />
		</div>
	);
};

export default work;
