import React from 'react';
import Create from '~/component/Profile/Create';
import { ProfileState } from '~/Type/Profile';

const create = (): JSX.Element => {
	const handleSubmit = (profileDataForm: ProfileState) => {
		console.log(profileDataForm);
	};

	return (
		<>
			<Create handleSubmit={handleSubmit} />
		</>
	);
};

export default create;
