import CustomInput from '../Form/CustomInput';
import { Box, Button, Container } from '@material-ui/core';
import CustomSelectField from '../Form/CustomSelectField';
import { WorkCreateState } from '~/Type/Work';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useProjectStates } from '~/ducks/selector';
import { Fab } from '@material-ui/core';
import TechniqueCreateModal from '~/container/Work/TechniqueCreateModal';

/**
 * Work新規追加フォームのViewコンポーネント.
 *
 * @param {WorkCreateState} props
 * @return {*}  {JSX.Element}
 */
const WorkCreate = (props: WorkCreateState): JSX.Element => {
	const { abouts, techniqueFieldList, aboutFieldList, handleClickAddTechnique, handleClickDeleteTechnique, handleClickAddAbout } = props;

	const {
		id,
		name,
		startDate,
		endDate,
		addDate,
		gitUrl,
		projectTechniques,
		projectAbouts,
		projectImages,
	} = useProjectStates().projects[0];

	const [modal, setModal] = useState(false);

	const handleClickModalShow = (show: boolean) => {
		setModal(show);
	};

	const methods = useForm();
	return (
		<>
			<Container style={{ width: '80%', marginTop: 50 }}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(props.handleSubmit)}>
						<input type="hidden" name="id" value={id != null ? id : '0'} ref={methods.register} />
						<CustomInput
							label="ProjectTitle"
							name="name"
							required={true}
							length={64}
							url={false}
							date={false}
							value={name}
							placeholder="プロジェクトのタイトルを入力してください"
							customStyle={null}
						/>
						{techniqueFieldList.map((item, index) => (
							<Box width={1} display="flex" key={item}>
								<CustomInput
									label="UseTechnique"
									name={`projectTechniques[${index}].technique.name`}
									required={true}
									length={32}
									url={false}
									date={false}
									value={projectTechniques[index]?.technique.name}
									placeholder="使用している技術名を入力してください"
									customStyle={{ width: '70%' }}
								/>
								<CustomInput
									label="version"
									name={`projectTechniques[${index}].technique.version`}
									required={true}
									length={16}
									url={false}
									date={false}
									value={projectTechniques[index]?.technique.version}
									placeholder="バージョンを入力してください"
									customStyle={{ width: '30%' }}
								/>
								<Fab aria-label="Delete" color="secondary" size="small" onClick={() => handleClickDeleteTechnique(item)}>
									×
								</Fab>
							</Box>
						))}
						<Button
							style={{ margin: 8 }}
							variant="contained"
							color="primary"
							size="medium"
							onClick={() => handleClickModalShow(true)}
						>
							Create
						</Button>
						<Button style={{ margin: 8 }} onClick={handleClickAddTechnique} variant="contained" color="primary" size="medium">
							add
						</Button>
						<Box width={1} display="flex">
							<CustomInput
								label="StartDate"
								name="startDate"
								required={false}
								length={64}
								url={false}
								date={true}
								value={startDate}
								placeholder="プロジェクトの開始日を入力してください"
								customStyle={{ width: '30%' }}
							/>
							<CustomInput
								label="AddDate"
								name="addDate"
								required={false}
								length={64}
								url={false}
								date={true}
								value={addDate}
								placeholder="プロジェクトのリリース日を入力してください"
								customStyle={{ width: '30%' }}
							/>
							<CustomInput
								label="EndDate"
								name="endate"
								required={false}
								length={64}
								url={false}
								date={true}
								value={endDate}
								placeholder="プロジェクトの完了日を入力してください"
								customStyle={{ width: '30%' }}
							/>
						</Box>
						<CustomInput
							label="GitUrl"
							name="gitUrl"
							required={true}
							length={512}
							url={true}
							date={false}
							value={gitUrl}
							placeholder="GitのURLを入力してください"
							customStyle={null}
						/>
						<CustomSelectField
							label="ProjectAbouts"
							selectValue={abouts}
							editSelectValue={aboutFieldList}
							customStyle={null}
							handleClick={handleClickAddAbout}
						/>
						{aboutFieldList.map((value, index) => (
							<Box key={value}>
								<input type="hidden" name={`projectAbouts[${index}].about.name`} value={value} ref={methods.register} />
								<CustomInput
									label={value}
									name={`projectAbouts[${index}].description`}
									required={true}
									length={512}
									value=""
									url={false}
									date={false}
									placeholder={`${value}を入力してください`}
									customStyle={null}
								/>
							</Box>
						))}
						<Button type="submit" style={{ margin: 8 }} variant="contained" color="primary" size="medium">
							Submit
						</Button>
					</form>
				</FormProvider>
				{modal == true ? <TechniqueCreateModal handleClickShowModal={handleClickModalShow} /> : null}
			</Container>
		</>
	);
};

export default WorkCreate;
