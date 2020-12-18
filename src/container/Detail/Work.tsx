import React, { useState } from 'react';
import Work from '~/component/Detail/Work';
import SideBar from '~/container/SideBar';
import { filter } from 'lodash';
import { Work as WorkType } from '~/Type/Work';

const work = (): JSX.Element => {
	const [worksState] = useState([
		{
			projectId: 1,
			projectName: 'アンケート',
			sampleImgPathArr: [],
			gitUrl: 'test1',
			techniqueArr: [
				{
					techniqueName: 'Java',
					version: '11',
				},
				{
					techniqueName: 'PostgreSql',
					version: '11',
				},
			],
			feature: 'アンケートアプリの機能' /**機能*/,
			point: 'アンケートアプリの工夫点' /**工夫点*/,
			reflections: 'アンケートアプリの反省点' /**反省点*/,
		},
		{
			projectId: 2,
			projectName: 'ロジカルシンキング',
			sampleImgPathArr: [],
			gitUrl: 'test2',
			techniqueArr: [
				{
					techniqueName: 'Java',
					version: '14',
				},
				{
					techniqueName: 'PostgreSql',
					version: '13',
				},
			],
			feature: 'ロジカルシンキングアプリの機能' /**機能*/,
			point: 'ロジカルシンキングアプリの工夫点' /**工夫点*/,
			reflections: 'ロジカルシンキングアプリの反省点' /**反省点*/,
		},
	]);

	const [workState, setWorkState] = useState(worksState[0]);

	const handleClickSideBar = (projectId: number) => {
		const work: WorkType = filter(worksState, (value) => {
			return value.projectId == projectId;
		});
		setWorkState(work[0]);
	};

	return (
		<>
			<SideBar work={worksState} handleClick={(projectId: number) => handleClickSideBar(projectId)}></SideBar>
			<Work work={workState} />
		</>
	);
};

export default work;
