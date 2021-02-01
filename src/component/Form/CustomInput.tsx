import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import { CustomInputState } from '~/Type/Form';
import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';

/**
 * Material UiのTextFieleコンポーネントをラッピングしたカスタムコンポーネント.
 *
 * @param {CustomInputState} props テキストフィールド用のバリデーション等のプロパティ
 * @return {*}  {JSX.Element} テキストフィールドコンポーネント
 */
const CustomInput = (props: CustomInputState): JSX.Element => {
	const useStyles = makeStyles(() =>
		createStyles({
			textField: props.customStyle,
		}),
	);

	// react-hook-formのコンポーネント
	const { register, watch } = useForm();
	// Errorバリデーション用state
	const [errors, setError] = useState({
		requiredError: false,
		lengthError: false,
	});
	// カスタムバリデーター(必須, 長さ)
	const handleChangeTextField = () => {
		const value = watch(props.label);
		if (props.required && value.length == 0) {
			setError({
				...errors,
				requiredError: true,
			});
		} else if (props.length != 0 && value.length > props.length) {
			setError({
				...errors,
				lengthError: true,
			});
		} else {
			setError({
				...errors,
				requiredError: false,
				lengthError: false,
			});
		}
	};

	return (
		<TextField
			id="outlined-margin-dense"
			label={`${props.label} ${props.required ? '(必須)' : ''}${
				props.length != 0 ? ` ${watch(props.label)?.length ? watch(props.label).length : '0'}/${props.length}` : ''
			}`}
			style={{ margin: 8 }}
			placeholder={props.placeholder}
			fullWidth
			margin="normal"
			InputLabelProps={{
				shrink: true,
			}}
			name={props.label}
			inputRef={register}
			helperText={
				(errors.requiredError || errors.lengthError) && <Alert severity="error">{props.length}字以内で入力してください。</Alert>
			}
			multiline={props.length < 100 || props.url ? false : true}
			error={errors.requiredError || errors.lengthError ? true : false}
			onChange={handleChangeTextField}
			className={useStyles().textField}
		/>
	);
};

export default CustomInput;
