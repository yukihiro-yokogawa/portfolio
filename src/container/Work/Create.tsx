import React, { useEffect, useMemo, useState } from 'react';
import _, { filter } from 'lodash';
import { useDispatch } from 'react-redux';
import WorkCreate from '~/component/Work/WorkCreate';
import { useAboutState } from '~/ducks/selector';
import { getAboutsAsync } from '~/ducks/Slice/AboutSlice';

/**
 * Work新規追加フォームのロジックコンポーネント.
 *
 * @return {*}  {JSX.Element}
 */
const Create = (): JSX.Element => {
	// 使用技術追加のDOM変更用変数.
	const [techniqueFieldList, setTechniqueList] = useState(['techniqueField-0']);

	const [aboutFieldList, setAboutFieldList] = useState([]);

	const dispatch = useDispatch();

	// レンダリング後に実行されるアクション関数.
	useEffect(() => {
		dispatch(getAboutsAsync());
	}, [dispatch]);

	// Storeから取り出した値.
	const { abouts } = useAboutState();

	// aboutsの値が変更しないならキャッシュから取得.
	const aboutsArr = useMemo(() => {
		const createAbouts = [];
		_.forEach(abouts, (about: { name: any }) => {
			createAbouts.push(about.name);
		});
		return createAbouts;
	}, [abouts]);

	/**
	 * 技術新規追加フォーム増加イベント.
	 */
	const handleClickAddTechnique = () => {
		const newTehcniqueField = `techniqueField-${techniqueFieldList.length}`;
		setTechniqueList([...techniqueFieldList, newTehcniqueField]);
	};

	const handleClickAddAbout = (values: string[]) => {
		const newAboutFieldList = [...values];
		newAboutFieldList.splice(1, 0);
		console.log(newAboutFieldList);
		setAboutFieldList(newAboutFieldList);
	};

	return (
		<>
			<WorkCreate
				abouts={aboutsArr}
				techniqueFieldList={techniqueFieldList}
				aboutFieldList={aboutFieldList}
				handleClickAddTechnique={handleClickAddTechnique}
				handleClickAddAbout={handleClickAddAbout}
			/>
		</>
	);
};

export default Create;
