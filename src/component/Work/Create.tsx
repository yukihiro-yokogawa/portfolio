import CustomInput from '../Form/CustomInput';
import { Box, Button, Container } from '@material-ui/core';
import CustomSelectField from '../Form/CustomSelectField';
import { WorkCreateState } from '~/Type/Work';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStoreState } from '~/ducks/selector';
import { Fab } from '@material-ui/core';
import TechniqueCreateModal from '~/container/Modal/TechniqueCreateModal';
import CustomAutoComplete from '../Form/CustomAutoComplete';
import _ from 'lodash';
import AboutCreateModal from '~/container/Modal/AboutCreateModal';
import { ProjectContext } from '~/pages/Work/create';

/**
 * Work新規追加フォームのViewコンポーネント.
 *
 * @param {WorkCreateState} props
 * @return {*}  {JSX.Element}
 */
const create = (props: WorkCreateState): JSX.Element => {
	const {
		abouts,
		techniqueFieldList,
		aboutFieldList,
		autoCompleteTechniques,
		autoCompleteVersions,
		handleChangeTechnique,
		handleClickAddTechnique,
		handleClickDeleteTechnique,
		handleClickAddAbout,
		handleSubmit,
	} = props;

	const { id, name, startDate, endDate, addDate, gitUrl, projectTechniques } = useContext(ProjectContext);

	const [modal, setModal] = useState('');

	const handleClickShowModal = (show: string) => {
		setModal(show);
	};

	const getDateString = (date: string) => {
		return date?.match(/^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])/)[0];
	};

	const methods = useForm();

	return (
		<>
			<Container style={{ width: '80%', marginTop: 50 }}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(handleSubmit)}>
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
							<Box
								alignItems="center"
								width={1}
								display="flex"
								flexWrap="wrap"
								style={{ justifyContent: 'space-between' }}
								key={item}
							>
								<CustomAutoComplete
									index={index}
									label="UseTechnique"
									name={`projectTechniques[${index}].technique.name`}
									required={true}
									length={0}
									url={false}
									date={false}
									value={projectTechniques[index]?.technique.name}
									autoComplete={autoCompleteTechniques}
									placeholder="使用している技術名を入力してください"
									customStyle={{ width: '60%' }}
									handleChange={handleChangeTechnique}
								/>
								<CustomAutoComplete
									index={index}
									label="version"
									name={`projectTechniques[${index}].technique.version`}
									required={true}
									length={0}
									url={false}
									date={false}
									value={projectTechniques[index]?.technique.version}
									autoComplete={
										_.find(autoCompleteVersions, (autoCompleteVersion) => {
											return autoCompleteVersion?.id == index;
										})?.autoComplete
									}
									placeholder="バージョンを入力してください"
									customStyle={{ width: '30%' }}
									handleChange={null}
								/>
								<Fab
									aria-label="Delete"
									color="primary"
									size="small"
									style={{ width: '36px', height: '36px' }}
									onClick={() => {
										handleClickDeleteTechnique(item, index);
										methods.reset();
									}}
								>
									×
								</Fab>
							</Box>
						))}
						<Button
							style={{ margin: 8 }}
							variant="contained"
							color="primary"
							size="medium"
							onClick={() => handleClickShowModal('technique')}
						>
							Technique Create
						</Button>
						<Button style={{ margin: 8 }} onClick={handleClickAddTechnique} variant="contained" color="primary" size="medium">
							add
						</Button>
						<Box alignItems="center" width={1} display="flex" flexWrap="wrap" style={{ justifyContent: 'space-between' }}>
							<CustomInput
								label="StartDate"
								name="startDate"
								required={false}
								length={0}
								url={false}
								date={true}
								value={startDate != '' && startDate != null ? getDateString(startDate) : ''}
								placeholder="プロジェクトの開始日を入力してください"
								customStyle={{ width: '30%' }}
							/>
							<CustomInput
								label="AddDate"
								name="addDate"
								required={false}
								length={0}
								url={false}
								date={true}
								value={addDate !== '' && addDate !== null ? getDateString(addDate) : ''}
								placeholder="プロジェクトのリリース日を入力してください"
								customStyle={{ width: '30%' }}
							/>
							<CustomInput
								label="EndDate"
								name="endDate"
								required={false}
								length={0}
								url={false}
								date={true}
								value={endDate !== '' && endDate !== null ? getDateString(endDate) : ''}
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
						<Button
							style={{ margin: 8 }}
							variant="contained"
							color="primary"
							size="medium"
							onClick={() => handleClickShowModal('about')}
						>
							About Create
						</Button>
						<br />
						<Button
							type="submit"
							style={{ margin: 8 }}
							variant="contained"
							color="primary"
							size="medium"
							disabled={useStoreState().network.loading}
						>
							Submit
						</Button>
					</form>
				</FormProvider>
				{modal == 'technique' ? (
					<TechniqueCreateModal handleClickTechniqueShowModal={handleClickShowModal} />
				) : modal == 'about' ? (
					<AboutCreateModal handleClickAboutShowModal={handleClickShowModal} />
				) : null}
			</Container>
		</>
	);
};

export default create;
