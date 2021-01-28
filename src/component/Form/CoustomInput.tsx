import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import { CustomInputState } from '~/Type/Form';

const CustomInput = (props: CustomInputState): JSX.Element => {
	const { register, watch } = useForm();
	const [errors, setError] = useState({
		requiredError: false,
		lengthError: false,
	});

	const handleChangeTextField = () => {
		const value = watch(props.label);
		console.log(value.length);
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
			id="standard-full-width"
			type="text"
			label={`${props.label} ${props.required ? '(必須)' : ''} ${watch(props.label)?.length ? watch(props.label).length : '0'}/${
				props.length
			}`}
			style={{ margin: 8 }}
			placeholder="Placeholder"
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
		/>
	);
};

export default CustomInput;
