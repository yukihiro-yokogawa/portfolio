import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Work from '~/component/Work/Work';
import Slideshow from '~/component/Slideshow';
import SideBar from '~/container/SideBar';
import { filter } from 'lodash';
import { ProjectState } from '~/Type/Project';
import { getProjectsAsync } from '~/ducks/Slice/ProjectSlice';
import { useProjectStates } from '~/ducks/selector';

/**
 * プロジェクト概要表示のロジックコンポーネント.
 *
 * @return {*}  {JSX.Element}
 */
const work = (): JSX.Element => {
	// dispatch関数 アクションクリエイターで実装されるアクションを実行させる.
	const dispatch = useDispatch();

	// useEffectでアクションを実行させる関数をdispatchすることで再レンダリングされる.
	useEffect(() => {
		dispatch(getProjectsAsync());
	}, [dispatch]);

	const { projects } = useProjectStates();
	const [projectState, setProjectState] = useState<ProjectState>(projects[0]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const handleClickSideBar = useCallback(
		(projectId: number) => {
			const project = filter(projects, (value) => {
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
			setSelectedIndex(projectId);
		},
		[projectState, projects],
	);

	return (
		<div>
			<SideBar
				projects={projects}
				sideBar={null}
				selectedIndex={selectedIndex}
				handleClick={(projectId: number) => handleClickSideBar(projectId)}
			/>
			<Slideshow imgs={projectState?.projectImages} />
			<Work project={projectState} />
		</div>
	);
};

export default work;
