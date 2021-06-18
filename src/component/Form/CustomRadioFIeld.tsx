import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { ConnectForm } from "./ConnectForm";
import _ from "lodash";

/**
 * Material UiのFormControl（ラジオボタン）コンポーネントをラッピングしたカスタムコンポーネント.
 *
 * @param {{ name: string; label: string; values: Array<TechniqueTypeState> }} props
 * @return {*}  {JSX.Element}
 */
const CustomRadioField = (props: {
  name: string;
  label: string;
  defaultValue: number;
  values: Array<any>;
  customStyle: Record<string | number | symbol, any>;
}): JSX.Element => {
  const { name, label, defaultValue, values, customStyle } = props;

  return (
    <>
      <ConnectForm>
        {({ errors, register }) => (
          <FormControl
            style={{ ...customStyle, margin: "8px" }}
            component="fieldset"
            error={Boolean(_.get(errors, name))}
          >
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              row
              aria-label={label}
              name={name}
              defaultValue={String(defaultValue)}
            >
              {values.map((value, index) => (
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
            {_.get(errors, name) ? (
              <FormHelperText>選択してください</FormHelperText>
            ) : null}
          </FormControl>
        )}
      </ConnectForm>
    </>
  );
};

export default CustomRadioField;
