import React, { useState } from 'react';
import CustomInput from '../Form/CoustomInput';
import Button from '@material-ui/core/Button';

const WorkCreate = (): JSX.Element => {
	const [techniqueFieldList, setTechniqueList] = useState(['techniqueField-0']);

	const handleClickAddTechnique = () => {
		const newTehcniqueField = `techniqueField-${techniqueFieldList.length}`;
		setTechniqueList([...techniqueFieldList, newTehcniqueField]);
	};

	return (
		<>
			<form>
				<CustomInput label="ProjectTitle" required={true} length={64} url={false} />
				{techniqueFieldList.map((index) => (
					<CustomInput key={index} label="UseTechnique" required={true} length={32} url={false} />
				))}
				<Button onClick={handleClickAddTechnique} variant="contained" color="primary" size="medium">
					add
				</Button>
				<CustomInput label="GitUrl" required={true} length={512} url={true} />
				<Button variant="contained" color="primary" size="medium">
					Submit
				</Button>
			</form>
		</>
	);
};

export default WorkCreate;
