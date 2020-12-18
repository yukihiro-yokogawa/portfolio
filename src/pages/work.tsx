import React from 'react';
import Work from '~/container/Detail/Work';
import Slideshow from '~/container/Slideshow';
import SideBar from '~/component/SideBar';

const work: React.FC = () => {
	return (
		<>
			<SideBar />
			<div>
				<Slideshow />
				<Work />
			</div>
		</>
	);
};

export default work;
