import React from 'react';
import Work from '~/container/Detail/Work';
import Slideshow from '~/component/Slideshow';

const work: React.FC = () => {
	return (
		<div>
			<Slideshow />
			<Work />
		</div>
	);
};

export default work;
