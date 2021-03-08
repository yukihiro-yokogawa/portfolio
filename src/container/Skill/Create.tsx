import _ from 'lodash';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import SkillCreate from '~/component/Skill/SkillCreate';
import { useStoreState } from '~/ducks/selector';
import { postSkillAsync } from '~/ducks/Slice/SkillSlice';
import { SkillStates } from '~/Type/Skill';
import { AutoCompleteVersionState, TechniqueState } from '~/Type/Technique';

const Create = (): JSX.Element => {
	const dispatch = useDispatch();
	// 使用技術追加のDOM変更用変数.
	const [techniqueFieldList, setTechniqueFieldList] = useState([0]);
	// version入力部分のオートコンプリート.
	const [autoCompleteVersions, setAutoCompleteVersions] = useState([]);
	const { skills, techniques } = useStoreState();

	/**
	 * TechniqueのTextFieldコンポーネントで使用されるAutoComplete配列を生成する関数.
	 */
	const autoCompleteTechniques = useMemo(() => {
		return _(techniques)
			.map((technique) => {
				return { name: technique.name, type: technique.techniqueType.name };
			})
			.uniqBy('name')
			.value();
	}, [techniques]);

	/**
	 * TechniqueのTextFieldコンポーネントが変更された際に実行される、VersionのTextFieldコンポーネントで使用するAutoCompleteオブジェクトを生成するイベントハンドラ.
	 */
	const handleChangeTechnique = (event: React.ChangeEvent<any>, index: number) => {
		const key = _.findKey(autoCompleteVersions, (autoCompleteVersion) => {
			return autoCompleteVersion.id == index;
		});
		const autoCompleteVersion = _(techniques)
			.filter((technique) => {
				return technique.name == event.target.outerText;
			})
			.map((technique) => {
				return { id: technique.id, name: technique.version, type: '' };
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
	};

	/**
	 * 技術新規追加フォーム増加イベント.
	 */
	const handleClickAddTechnique = () => {
		const newTehcniqueField = techniqueFieldList.length == 0 ? 0 : _.max(techniqueFieldList) + 1;
		setTechniqueFieldList([...techniqueFieldList, newTehcniqueField]);
	};

	/**
	 * 技術新規追加フォーム減少イベント
	 *
	 * @param {number} key
	 */
	const handleClickDeleteTechnique = (key: number, index: number) => {
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
	};

	const handleSubmit = (skillsDataForm: SkillStates) => {
		_.forEach(skillsDataForm.skills, (skillData) => {
			const existSkill = _.find(skills, (skill) => {
				return skill.technique.name == skillData.technique.name && skill.technique.version == skillData.technique.version;
			});
			if (typeof existSkill !== 'undefined') {
				skillData.id = existSkill.id;
				skillData.technique = existSkill.technique;
				return;
			}
			const technique: TechniqueState = _.find(techniques, (technique) => {
				return technique.name == skillData.technique.name;
			});
			if (typeof technique !== 'undefined') {
				skillData.technique.id = technique?.id;
				skillData.technique.techniqueType = technique?.techniqueType;
			}
		});
		dispatch(postSkillAsync(skillsDataForm));
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
