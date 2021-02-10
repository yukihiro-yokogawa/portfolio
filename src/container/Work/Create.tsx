import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import WorkCreate from '~/component/Work/WorkCreate';
import { ProjectState } from '~/Type/Project';
import { AboutState } from '~/Type/About';
import { useAboutState } from '~/ducks/selector';
import { useDispatch } from 'react-redux';
import { postProjectAsync } from '~/ducks/Slice/ProjectSlice';

/**
 * Work新規追加フォームのロジックコンポーネント.
 *
 * @return {*}  {JSX.Element}
 */
const Create = (): JSX.Element => {
	const dispatch = useDispatch();
	// const project = useProjectStates().projects[0];
	const abouts = useAboutState().abouts;

	// 使用技術追加のDOM変更用変数.
	const [techniqueFieldList, setTechniqueFieldList] = useState([0]);

	const [aboutFieldList, setAboutFieldList] = useState([]);

	// aboutsの値が変更しないならキャッシュから取得.
	const aboutsArr = useMemo(() => {
		const createAbouts = [];
		_.forEach(abouts, (about: AboutState) => {
			createAbouts.push(about.name);
		});
		return createAbouts;
	}, [abouts]);

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
	const handleClickDeleteTechnique = (key: number) => {
		const newTechniqueField = _.without(techniqueFieldList, key);
		setTechniqueFieldList(newTechniqueField);
	};

	/**
	 * プロジェクトの特徴を記載するフォームを増やすイベント.
	 *
	 * @param {string[]} values
	 */
	const handleClickAddAbout = (values: string[]) => {
		const aboutsName = [];
		_.forEach(values, (value) => {
			aboutsName.push(value);
		});
		aboutsName.splice(1, 0);
		setAboutFieldList(aboutsName);
	};

	/**
	 * サブミット時のイベント.
	 *
	 * @param {*} event
	 */
	const handleSubmit = (newProjectData: ProjectState) => {
		dispatch(postProjectAsync(newProjectData));
	};

	return (
		<>
			<WorkCreate
				abouts={aboutsArr}
				techniqueFieldList={techniqueFieldList}
				aboutFieldList={aboutFieldList}
				handleClickAddTechnique={handleClickAddTechnique}
				handleClickDeleteTechnique={handleClickDeleteTechnique}
				handleClickAddAbout={handleClickAddAbout}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default Create;
