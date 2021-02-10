import { Button } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TechniqueState } from '~/Type/Technique';
import CustomInput from '../Form/CustomInput';

const TechniqueCreateModal = (props: {
	show: boolean;
	handleShowModal: (isShow: boolean) => void;
	handleSubmit: (data: TechniqueState) => void;
}): JSX.Element => {
	const methods = useForm();

	return (
		<>
			<Button style={{ margin: 8 }} variant="contained" color="primary" size="medium" onClick={() => props.handleShowModal(true)}>
				Create
			</Button>
			{props.show ? (
				<div id="overlay" onClick={() => props.handleShowModal(false)}>
					<div id="content" onClick={(e) => e.stopPropagation()}>
						<p>登録する技術の情報を入力してください</p>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(props.handleSubmit)}>
								<CustomInput
									label="Technique"
									name={'name'}
									required={true}
									length={32}
									url={false}
									date={false}
									value=""
									placeholder="登録したい技術名を入力してください"
									customStyle={null}
								/>
								<CustomInput
									label="Version"
									name={'version'}
									required={false}
									length={32}
									url={false}
									date={false}
									value=""
									placeholder="バージョンを入力してください"
									customStyle={null}
								/>
								<Button
									style={{ margin: 8 }}
									variant="contained"
									color="primary"
									size="medium"
									type="button"
									onClick={() => props.handleShowModal(false)}
								>
									close
								</Button>
								<Button
									style={{ margin: 8 }}
									variant="contained"
									color="primary"
									size="medium"
									onClick={() => props.handleShowModal(false)}
								>
									register
								</Button>
							</form>
						</FormProvider>
					</div>
				</div>
			) : null}
		</>
	);
};
export default TechniqueCreateModal;
