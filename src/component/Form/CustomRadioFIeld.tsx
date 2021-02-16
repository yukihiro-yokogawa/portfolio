import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@material-ui/core';
import React from 'react';
import { ConnectForm } from './ConnectForm';
import _ from 'lodash';
import { TechniqueTypeStates } from '~/Type/Technique';

/**
 * Material UiのFormControl（ラジオボタン）コンポーネントをラッピングしたカスタムコンポーネント.
 *
 * @param {{ name: string; label: string; values: TechniqueTypeStates }} props
 * @return {*}  {JSX.Element}
 */
const CustomRadioField = (props: { name: string; label: string; values: TechniqueTypeStates }): JSX.Element => {
	return (
		<>
			<ConnectForm>
				{({ errors, register }) => (
					<FormControl style={{ margin: '8px' }} component="fieldset" error={Boolean(_.get(errors, props.name))}>
						<FormLabel>{props.label}</FormLabel>
						<RadioGroup row aria-label="techniqueType" name="techniqueType.name">
							{props.values.techniqueTypes.map((techniqueType, index) => (
								<FormControlLabel
									key={index}
									value={techniqueType.name}
									control={<Radio color="primary" />}
									label={techniqueType.name}
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
