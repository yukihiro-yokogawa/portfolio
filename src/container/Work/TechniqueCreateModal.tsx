import TechniqueCreateModal from '~/component/Work/TechniqueCreateModal';
import { useTechniqueTypeState } from '~/ducks/selector';
import { TechniqueState } from '~/Type/Technique';
import _ from 'lodash';
import { postTechniqueAsync } from '~/ducks/Slice/TechniqueSlice';
import { useDispatch } from 'react-redux';

/**
 * 新規技術登録時のモーダル表示用コンテナコンポーネント.
 *
 * @param {{ handleClickShowModal: (isShow: boolean) => void }} props
 * @return {*}  {JSX.Element}
 */
const techniqueCreateModal = (props: { handleClickShowModal: (isShow: boolean) => void }): JSX.Element => {
	const dispatch = useDispatch();
	const techniqueTypes = useTechniqueTypeState();

	// 新規技術登録
	const handleClickSubmit = (data: TechniqueState) => {
		const techniqueType = _.find(techniqueTypes.techniqueTypes, (values) => {
			return values.name === data.techniqueType.name;
		});
		const technique: TechniqueState = {
			id: 0,
			name: data.name,
			version: data.version,
			techniqueType: {
				id: techniqueType.id,
				name: data.techniqueType.name,
				displayOrder: techniqueType.displayOrder,
			},
		};
		dispatch(postTechniqueAsync(technique));
	};

	return (
		<>
			<TechniqueCreateModal
				techniqueTypes={techniqueTypes}
				handleClickShowModal={props.handleClickShowModal}
				handleSubmit={handleClickSubmit}
			/>
		</>
	);
};

export default techniqueCreateModal;
