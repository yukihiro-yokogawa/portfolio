import React, { useState } from 'react';
import Work from '~/component/Detail/Work';
import SideBar from '~/container/SideBar';

const work = (): JSX.Element => {
	const [state] = useState([
		{
			projectId: 1,
			projectName: 'アンケート',
			sampleImgPathArr: [],
			gitUrl: '',
			techniqueArr: [
				{
					techniqueName: '',
					version: '',
				},
			],
			feature: '' /**機能*/,
			point: '' /**工夫点*/,
			reflections: '' /**反省点*/,
		},
		{
			projectId: 2,
			projectName: 'ロジカルシンキング',
			sampleImgPathArr: [],
			gitUrl: '',
			techniqueArr: [
				{
					techniqueName: '',
					version: '',
				},
			],
			feature: '' /**機能*/,
			point: '' /**工夫点*/,
			reflections: '' /**反省点*/,
		},
	]);

	return (
		<>
			<SideBar work={state}></SideBar>
			<Work />
		</>
	);
};

export default work;
