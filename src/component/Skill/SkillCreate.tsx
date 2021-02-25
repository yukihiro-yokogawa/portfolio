import { Box, Button, Container, Fab } from '@material-ui/core';
import _ from 'lodash';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TechniqueCreateModal from '~/container/Modal/TechniqueCreateModal';
import { SkillCreateState } from '~/Type/Skill';
import CustomAutoComplete from '../Form/CustomAutoComplete';
import CustomRadioField from '../Form/CustomRadioFIeld';

const SkillCreate = (props: SkillCreateState): JSX.Element => {
	const methods = useForm();
	const {
		techniqueFieldList,
		autoCompleteTechniques,
		autoCompleteVersions,
		handleChangeTechnique,
		handleClickAddTechnique,
		handleClickDeleteTechnique,
		handleSubmit,
	} = props;

	const [modal, setModal] = useState(false);

	const handleClickModalShow = (show: boolean) => {
		setModal(show);
	};

	return (
		<Container style={{ width: '80%', marginTop: 50 }}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(handleSubmit)}>
					{techniqueFieldList.map((item, index) => (
						<Box
							alignItems="center"
							width={1}
							display="flex"
							flexWrap="wrap"
							style={{ marginTop: '10px', justifyContent: ' space-between' }}
							key={item}
						>
							<CustomRadioField
								name={`skill[${index}].level`}
								label="level"
								values={[{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }]}
								customStyle={{ width: '100%' }}
							/>
							<CustomAutoComplete
								index={index}
								label="UseTechnique"
								name={`skill[${index}].technique.name`}
								required={true}
								length={0}
								url={false}
								date={false}
								value={null}
								autoComplete={autoCompleteTechniques}
								placeholder="使用している技術名を入力してください"
								customStyle={{ width: '60%' }}
								handleChange={handleChangeTechnique}
							/>
							<CustomAutoComplete
								index={index}
								label="version"
								name={`skill[${index}].technique.version`}
								required={true}
								length={0}
								url={false}
								date={false}
								value={null}
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
								onClick={() => handleClickDeleteTechnique(item, index)}
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
						onClick={() => handleClickModalShow(true)}
					>
						Create
					</Button>
					<Button style={{ margin: 8 }} onClick={handleClickAddTechnique} variant="contained" color="primary" size="medium">
						add
					</Button>
					<Button type="submit" style={{ margin: 8 }} variant="contained" color="primary" size="medium">
						Submit
					</Button>
				</form>
			</FormProvider>
			{modal == true ? <TechniqueCreateModal handleClickShowModal={handleClickModalShow} /> : null}
		</Container>
	);
};

export default SkillCreate;
