import React, { useState } from 'react';
import Work from '~/component/Detail/Work';
import Slideshow from '~/component/Slideshow';
import SideBar from '~/container/SideBar';
import { filter } from 'lodash';
import { Work as WorkType } from '~/Type/Work';

const work = (): JSX.Element => {
	const [worksState] = useState([
		{
			projectId: 1,
			projectName: 'アンケート',
			sampleImgPathArr: [
				'/img/ancate/ancate_top.png',
				'/img/ancate/ancate_content.png',
				'/img/ancate/ancate_edit.png',
				'/img/ancate/ancate_admin.png',
				'/img/ancate/ancate_admin_edit.png',
				'/img/ancate/ancate_userinsert.png',
				'/img/ancate/ancate_userprofile.png',
			],
			gitUrl: 'test1',
			techniqueArr: [
				{
					techniqueName: 'Java',
					version: '11',
				},
				{
					techniqueName: 'Thymeleaf',
					version: '3',
				},
				{
					techniqueName: 'SpringSecurity',
					version: '',
				},
				{
					techniqueName: 'PostgreSql',
					version: '11',
				},
				{
					techniqueName: 'HTML',
					version: '5',
				},
				{
					techniqueName: 'CSS',
					version: '3',
				},
				{
					techniqueName: 'JavaScript',
					version: '',
				},
			],
			feature: 'アンケートアプリの機能' /**機能*/,
			point: 'アンケートアプリの工夫点' /**工夫点*/,
			reflections: 'アンケートアプリの反省点' /**反省点*/,
		},
		{
			projectId: 2,
			projectName: 'ロジカルシンキング',
			sampleImgPathArr: [
				'/img/logical_thinking/step1.png',
				'/img/logical_thinking/step2.png',
				'/img/logical_thinking/step2 pyramidtree.png',
				'/img/logical_thinking/step3.png',
			],
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
				{
					techniqueName: 'HTML',
					version: '5',
				},
				{
					techniqueName: 'CSS',
					version: '3',
				},
				{
					techniqueName: 'JavaScript',
					version: '',
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
			<SideBar work={worksState} handleClick={(projectId: number) => handleClickSideBar(projectId)} />
			<Slideshow imgs={workState.sampleImgPathArr} />
			<Work work={workState} />
		</>
	);
};

export default work;
