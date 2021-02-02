import CustomInput from '../Form/CustomInput';
import { Box, Button, Container } from '@material-ui/core';
import CustomSelectField from '../Form/CustomSelectField';
import { WorkCreateState } from '~/Type/Work';

/**
 * Work新規追加フォームのViewコンポーネント.
 *
 * @param {WorkCreateState} props
 * @return {*}  {JSX.Element}
 */
const WorkCreate = (props: WorkCreateState): JSX.Element => {
	const { abouts, techniqueFieldList, aboutFieldList, handleClickAddTechnique, handleClickAddAbout } = props;

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
						<Box width={1} display="flex" key={index}>
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
					<CustomSelectField label="ProjectAbouts" selectValue={abouts} customStyle={null} handleClick={handleClickAddAbout} />
					{aboutFieldList.map((value) => (
						<CustomInput
							key={value}
							label={value}
							required={true}
							length={512}
							url={false}
							placeholder={`${value}を入力してください`}
							customStyle={null}
						/>
					))}
					<Button style={{ margin: 8 }} variant="contained" color="primary" size="medium">
						Submit
					</Button>
				</form>
			</Container>
		</>
	);
};

export default WorkCreate;
