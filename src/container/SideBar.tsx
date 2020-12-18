import React, { useMemo } from 'react';
import SideBar from '~/component/SideBar';
import { Works } from '~/type/Work';

const sideBar = (props: Works): JSX.Element => {
	const sideBarNameList = useMemo(() => createSideBar(), []);

	function createSideBar() {
		const sideBarWorks = [];
		props.work.map((work) => {
			const sideBarWork = {
				id: work.projectId,
				name: work.projectName,
			};
			sideBarWorks.push(sideBarWork);
		});
		return sideBarWorks;
	}

	return (
		<>
			<SideBar sideBar={sideBarNameList} />
		</>
	);
};

export default sideBar;
