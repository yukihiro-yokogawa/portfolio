import TextField from '@material-ui/core/TextField';
import React from 'react';
import { CustomInputState } from '~/Type/Form';
import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { ConnectForm } from './ConnectForm';
import _ from 'lodash';

/**
 * Material UiのTextFieldコンポーネントをラッピングしたカスタムコンポーネント.
 *
 * @param {CustomInputState} props テキストフィールド用のバリデーション等のプロパティ
 * @return {*}  {JSX.Element} テキストフィールドコンポーネント
 */
const CustomInput = (props: CustomInputState): JSX.Element => {
	const { label, name, required, length, url, value, date, placeholder, customStyle } = props;
	const useStyles = makeStyles(() =>
		createStyles({
			textField: customStyle,
		}),
	);
	return (
		<>
			<ConnectForm>
				{({ watch, errors, register }) => (
					<TextField
						defaultValue={value}
						id="outlined-margin-dense"
						label={`${label} ${required ? '(必須)' : ''}${
							length != 0 ? ` ${watch(name)?.length ? watch(name).length : '0'}/${props.length}` : ''
						}`}
						style={{ margin: 8 }}
						placeholder={placeholder}
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
						type={date ? 'date' : 'text'}
						name={name}
						multiline={length < 100 || url ? false : true}
						inputRef={register({ required: required, maxLength: length })}
						error={Boolean(_.get(errors, name))}
						helperText={
							_.get(errors, name) && `${label}${length === 0 ? `を入力してください` : `は${length}文字以内にして下さい`}。`
						}
						className={useStyles().textField}
						inputProps={length != 0 ? { maxLength: length } : {}}
						autoComplete="off"
					/>
				)}
			</ConnectForm>
		</>
	);
};

export default CustomInput;
