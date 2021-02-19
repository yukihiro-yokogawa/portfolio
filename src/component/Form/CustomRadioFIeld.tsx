import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@material-ui/core';
import React from 'react';
import { ConnectForm } from './ConnectForm';
import _ from 'lodash';

/**
 * Material UiのFormControl（ラジオボタン）コンポーネントをラッピングしたカスタムコンポーネント.
 *
 * @param {{ name: string; label: string; values: Array<TechniqueTypeState> }} props
 * @return {*}  {JSX.Element}
 */
const CustomRadioField = (props: {
	name: string;
	label: string;
	values: Array<any>;
	customStyle: Record<string | number | symbol, any>;
}): JSX.Element => {
	return (
		<>
			<ConnectForm>
				{({ errors, register }) => (
					<FormControl
						style={{ ...props.customStyle, margin: '8px' }}
						component="fieldset"
						error={Boolean(_.get(errors, props.name))}
					>
						<FormLabel>{props.label}</FormLabel>
						<RadioGroup row aria-label={props.label} name={props.name}>
							{props.values.map((value, index) => (
								<FormControlLabel
									key={index}
									value={value.name}
									control={<Radio color="primary" />}
									label={value.name}
									labelPlacement="bottom"
									inputRef={register({ required: true })}
								/>
							))}
						</RadioGroup>
						{_.get(errors, props.name) ? <FormHelperText>選択してください</FormHelperText> : null}
					</FormControl>
				)}
			</ConnectForm>
		</>
	);
};

export default CustomRadioField;
