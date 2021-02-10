import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TechniqueCreateModal from '~/component/Work/TechniqueCreateModal';
import { TechniqueState } from '~/Type/Technique';

const techniqueCreateModal = (): JSX.Element => {
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const handleClickShowModal = (show: boolean) => {
		setShow(show);
	};

	const handleClickSubmit = (data: TechniqueState) => {
		console.log(data);
	};

	return (
		<>
			<TechniqueCreateModal show={show} handleShowModal={handleClickShowModal} handleSubmit={handleClickSubmit} />
		</>
	);
};

export default techniqueCreateModal;
