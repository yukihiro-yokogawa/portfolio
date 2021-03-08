import React, { useCallback, useContext, useMemo, useState } from 'react';
import _ from 'lodash';
import WorkCreate from '~/component/Work/WorkCreate';
import { ProjectState } from '~/Type/Project';
import { AboutState } from '~/Type/About';
import { useStoreState } from '~/ducks/selector';
import { useDispatch } from 'react-redux';
import { AutoCompleteVersionState } from '~/Type/Technique';
import { postProjectAsync } from '~/ducks/Slice/ProjectSlice';
import { ProjectContext } from '~/pages/Work/create';

/**
 * Work新規追加フォームのロジックコンポーネント.
 *
 * @return {*}  {JSX.Element}
 */
const Create = (): JSX.Element => {
	const dispatch = useDispatch();
	const { techniques, abouts } = useStoreState();

	const { projectTechniques, projectAbouts } = useContext(ProjectContext);

	// 使用技術追加のDOM変更用変数.
	const [techniqueFieldList, setTechniqueFieldList] = useState(projectTechniques.length == 0 ? [0] : projectTechniques.map((_, i) => i));
	// version入力部分のオートコンプリート.
	const [autoCompleteVersions, setAutoCompleteVersions] = useState([]);

	// project詳細のDOM変更用変数.
	const [aboutFieldList, setAboutFieldList] = useState(
		projectAbouts.length == 0
			? []
			: _.map(projectAbouts, (projectAbout) => {
					return projectAbout.about.name;
			  }),
	);

	// aboutsの値が変更しないならキャッシュから取得.
	const aboutsArr = useMemo(() => {
		const createAbouts = [];
		_.forEach(abouts, (about: AboutState) => {
			createAbouts.push(about.name);
		});
		return createAbouts;
	}, [abouts]);

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

	/**
	 * プロジェクトの特徴を記載するフォームを増やすイベント.
	 *
	 * @param {string[]} values
	 */
	const handleClickAddAbout = useCallback((values: string[]) => {
		const aboutsName = [];
		_.forEach(values, (value) => {
			aboutsName.push(value);
		});
		aboutsName.splice(1, 0);
		setAboutFieldList(aboutsName);
	}, []);

	/**
	 * サブミット時のイベント.
	 *
	 * @param {*} event
	 */
	const handleSubmit = useCallback(
		(projectDataForm: ProjectState) => {
			_(projectDataForm.projectAbouts).forEach((projectAbout) => {
				projectAbout.about.id = _.find(abouts, (about) => {
					return about.name == projectAbout.about.name;
				}).id;
			});
			_(projectDataForm.projectTechniques).forEach((projectTechnique) => {
				projectTechnique.technique.id = _.find(techniques, (technique) => {
					return technique.name === projectTechnique.technique.name;
				}).id;
			});
			_(projectDataForm.projectTechniques).forEach((projectTechnique) => {
				const techniqueType = _.find(techniques, (technique) => {
					return technique.name === projectTechnique.technique.name;
				}).techniqueType;
				projectTechnique.technique.techniqueType = {
					id: techniqueType.id,
					name: techniqueType.name,
					displayOrder: techniqueType.displayOrder,
				};
			});
			dispatch(postProjectAsync(projectDataForm));
		},
		[abouts, dispatch, techniques],
	);

	return (
		<>
			<WorkCreate
				abouts={aboutsArr}
				techniqueFieldList={techniqueFieldList}
				aboutFieldList={aboutFieldList}
				autoCompleteTechniques={autoCompleteTechniques}
				autoCompleteVersions={autoCompleteVersions}
				handleChangeTechnique={handleChangeTechnique}
				handleClickAddTechnique={handleClickAddTechnique}
				handleClickDeleteTechnique={handleClickDeleteTechnique}
				handleClickAddAbout={handleClickAddAbout}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default Create;
