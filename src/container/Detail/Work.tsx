import React from 'react';
import Work from '~/component/Detail/Work';
import SideBar from '~/container/SideBar';

const work: React.FC = () => {
	return (
		<>
			<SideBar />
			<Work />
		</>
	);
};

export default work;
