import React, { useEffect, useState } from 'react';
import CustomInput from '../Form/CustomInput';
import { Box, Button, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getAboutsAsync } from '~/ducks/Slice/AboutSlice';
import { useAboutState } from '~/ducks/selector';
import { CustomSelectField } from '../Form/CustomSelectField';
import _ from 'lodash';

/**
 * Work新規追加フォーム.
 *
 * @return {*}  {JSX.Element} Work新規追加フォーム
 */
const WorkCreate = (): JSX.Element => {
	const [techniqueFieldList, setTechniqueList] = useState(['techniqueField-0']);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAboutsAsync());
	}, [dispatch]);

	const { abouts } = useAboutState();

	console.log(abouts);

	const createAboutsArr = () => {
		const aboutsArr = [];
		_.forEach(abouts, (about) => {
			aboutsArr.push(about.name);
		});
		return aboutsArr;
	};

	/**
	 * 技術新規追加フォーム増加イベント.
	 */
	const handleClickAddTechnique = () => {
		const newTehcniqueField = `techniqueField-${techniqueFieldList.length}`;
		setTechniqueList([...techniqueFieldList, newTehcniqueField]);
	};

	return (
		<>
			<Container style={{ width: '80%', marginTop: 50 }}>
				<form>
					<CustomInput
						label="ProjectTitle"
						required={true}
						length={64}
						url={false}
						placeholder="プロジェクトのタイトルを入力してください"
						customStyle={null}
					/>
					{techniqueFieldList.map((index) => (
						<Box width={1} display="flex" justifyContent="center" key={index}>
							<CustomInput
								label="UseTechnique"
								required={true}
								length={32}
								url={false}
								placeholder="使用している技術名を入力してください"
								customStyle={{ width: '70%' }}
							/>
							<CustomInput
								label="version"
								required={true}
								length={16}
								url={false}
								placeholder="バージョンを入力してください"
								customStyle={{ width: '30%' }}
							/>
						</Box>
					))}
					<Button style={{ margin: 8 }} onClick={handleClickAddTechnique} variant="contained" color="primary" size="medium">
						add
					</Button>
					<CustomInput
						label="GitUrl"
						required={true}
						length={512}
						url={true}
						placeholder="GitのURLを入力してください"
						customStyle={null}
					/>
					<CustomSelectField label="ProjectAbouts" selectValue={createAboutsArr()} customStyle={null} />
					<Button style={{ margin: 8 }} variant="contained" color="primary" size="medium">
						Submit
					</Button>
				</form>
			</Container>
		</>
	);
};

export default WorkCreate;
