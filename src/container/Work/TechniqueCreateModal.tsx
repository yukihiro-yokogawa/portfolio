import TechniqueCreateModal from '~/component/Work/TechniqueCreateModal';
import { useStoreState } from '~/ducks/selector';
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
const techniqueCreateModal = (props: { handleClickTechniqueShowModal: (show: string) => void }): JSX.Element => {
	const dispatch = useDispatch();
	const techniqueTypes = useStoreState().techniqueTypes;

	// 新規技術登録
	const handleClickSubmit = (data: TechniqueState) => {
		const techniqueType = _.find(techniqueTypes, (values) => {
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
				handleClickTechniqueShowModal={props.handleClickTechniqueShowModal}
				handleSubmit={handleClickSubmit}
			/>
		</>
	);
};

export default techniqueCreateModal;
