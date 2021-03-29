import { Container } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileCreateState } from '~/Type/Profile';
import CustomInput from '../Form/CustomInput';

const create = (props: ProfileCreateState): JSX.Element => {
	const methods = useForm();
	return (
		<Container style={{ width: '80%', marginTop: 50 }}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(props.handleSubmit)}>
					<CustomInput
						label=""
						name="description"
						required={false}
						length={1024}
						url={false}
						date={false}
						value=""
						placeholder="自己紹介文を入力してください"
						customStyle={null}
					/>
					<CustomInput
						label=""
						name="date"
						required={false}
						length={0}
						url={false}
						date={true}
						value=""
						placeholder="経歴の日付を入力してください。"
						customStyle={null}
					/>
					<CustomInput
						label=""
						name="title"
						required={false}
						length={64}
						url={false}
						date={false}
						value=""
						placeholder="経歴の見出しを入力してください。"
						customStyle={null}
					/>
					<CustomInput
						label=""
						name="description"
						required={false}
						length={512}
						url={false}
						date={false}
						value=""
						placeholder="概要を入力してください。"
						customStyle={null}
					/>
				</form>
			</FormProvider>
		</Container>
	);
};

export default create;
