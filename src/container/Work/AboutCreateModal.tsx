import React from 'react';
import { useDispatch } from 'react-redux';
import AboutCreateModal from '~/component/Work/AboutCreateModal';
import { postAboutAsync } from '~/ducks/Slice/AboutSlice';
import { AboutState } from '~/Type/About';

const aboutCreateModal = (props: { handleClickAboutShowModal: (show: string) => void }): JSX.Element => {
	const dispatch = useDispatch();
	const handleClickSubmit = (data: AboutState) => {
		const about: AboutState = {
			id: 0,
			name: data.name,
		};
		dispatch(postAboutAsync(about));
	};

	return (
		<>
			<AboutCreateModal handleClickAboutShowModal={props.handleClickAboutShowModal} handleSubmit={handleClickSubmit} />
		</>
	);
};

export default aboutCreateModal;
