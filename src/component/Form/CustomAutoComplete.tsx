import TextField from '@material-ui/core/TextField';
import React from 'react';
import { AutoCompleteState } from '~/Type/Form';
import { ConnectForm } from './ConnectForm';
import _ from 'lodash';
import { Autocomplete } from '@material-ui/lab';

/**
 * Material UiのTextFieldコンポーネントをラッピングしたカスタムコンポーネント.
 *
 * @param {CustomInputState} props テキストフィールド用のバリデーション等のプロパティ
 * @return {*}  {JSX.Element} テキストフィールドコンポーネント
 */
const customAutoComplete = (props: AutoCompleteState): JSX.Element => {
	const { index, label, name, required, length, url, date, value, autoComplete, placeholder, customStyle, handleChange } = props;

	return (
		<>
			<ConnectForm>
				{({ watch, errors, register }) => (
					<Autocomplete
						freeSolo
						options={typeof autoComplete === 'undefined' ? [] : autoComplete}
						style={customStyle}
						// groupBy={(option) => (typeof option?.groupName === 'undefined' ? null : option?.groupName)}
						getOptionLabel={(option) => option}
						renderInput={(params) => (
							<>
								<TextField
									{...params}
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
									helperText={_.get(errors, name) && `${label}は${length}文字以内にして下さい。`}
									inputProps={{ ...params.inputProps, maxLength: length != 0 ? length : null }}
								/>
							</>
						)}
						onChange={handleChange === null ? null : (e) => handleChange(e, index)}
					/>
				)}
			</ConnectForm>
		</>
	);
};

export default customAutoComplete;