import _ from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import SkillCreate from '~/component/Skill/SkillCreate';
import { useStoreState } from '~/ducks/selector';
import { SkillState } from '~/Type/Skill';
import { AutoCompleteVersionState } from '~/Type/Technique';

const Create = (): JSX.Element => {
	// 使用技術追加のDOM変更用変数.
	const [techniqueFieldList, setTechniqueFieldList] = useState([0]);
	// version入力部分のオートコンプリート.
	const [autoCompleteVersions, setAutoCompleteVersions] = useState([]);
	const { techniques } = useStoreState();

	/**
	 * TechniqueのTextFieldコンポーネントで使用されるAutoComplete配列を生成する関数.
	 */
	const autoCompleteTechniques = useMemo(() => {
		return _(techniques)
			.map((technique) => {
				return technique.name;
			})
			.uniq()
			.value();
	}, [techniques]);

	/**
	 * TechniqueのTextFieldコンポーネントが変更された際に実行される、VersionのTextFieldコンポーネントで使用するAutoCompleteオブジェクトを生成するイベントハンドラ.
	 */
	const handleChangeTechnique = useCallback(
		(event: React.ChangeEvent<any>, index: number) => {
			const key = _.findKey(autoCompleteVersions, (autoCompleteVersion) => {
				return autoCompleteVersion.id == index;
			});
			const autoCompleteVersion = _(techniques)
				.filter((technique) => {
					return technique.name == event.target.outerText;
				})
				.map((technique) => {
					return technique.version;
				})
				.value();
			if (!key) {
				const newAutoCompleteVersion: AutoCompleteVersionState = {
					id: index,
					autoComplete: autoCompleteVersion,
				};
				setAutoCompleteVersions([...autoCompleteVersions, newAutoCompleteVersion]);
			} else {
				autoCompleteVersions[key].autoComplete = autoCompleteVersion;
				setAutoCompleteVersions([...autoCompleteVersions]);
			}
		},
		[techniques, autoCompleteVersions],
	);

	/**
	 * 技術新規追加フォーム増加イベント.
	 */
	const handleClickAddTechnique = useCallback(() => {
		const newTehcniqueField = techniqueFieldList.length == 0 ? 0 : _.max(techniqueFieldList) + 1;
		setTechniqueFieldList([...techniqueFieldList, newTehcniqueField]);
	}, [techniqueFieldList]);

	/**
	 * 技術新規追加フォーム減少イベント
	 *
	 * @param {number} key
	 */
	const handleClickDeleteTechnique = useCallback(
		(key: number, index: number) => {
			const newTechniqueField = _.without(techniqueFieldList, key);
			setTechniqueFieldList(newTechniqueField);
			const deletedAutoCompleteVersions = _.filter(autoCompleteVersions, (autoCompleteVersion) => {
				return autoCompleteVersion.id !== index;
			});
			// versionのAutoCompleteリストを操作.
			_.forEach(deletedAutoCompleteVersions, (autoCompleteVersion) => {
				autoCompleteVersion.id > index ? (autoCompleteVersion.id = autoCompleteVersion.id - 1) : null;
			});
			setAutoCompleteVersions([...deletedAutoCompleteVersions]);
		},
		[autoCompleteVersions, techniqueFieldList],
	);

	const handleSubmit = (data: SkillState) => {
		console.log(data);
	};

	return (
		<>
			<SkillCreate
				techniqueFieldList={techniqueFieldList}
				autoCompleteTechniques={autoCompleteTechniques}
				autoCompleteVersions={autoCompleteVersions}
				handleChangeTechnique={handleChangeTechnique}
				handleClickAddTechnique={handleClickAddTechnique}
				handleClickDeleteTechnique={handleClickDeleteTechnique}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default Create;
