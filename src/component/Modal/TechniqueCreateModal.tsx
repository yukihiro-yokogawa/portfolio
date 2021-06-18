import { Button } from "@material-ui/core";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useStoreState } from "~/ducks/selector";
import { TechniqueState, TechniqueTypeState } from "~/Type/Technique";
import CustomInput from "../Form/CustomInput";
import CustomRadioField from "../Form/CustomRadioFIeld";

const TechniqueCreateModal = (props: {
  techniqueTypes: Array<TechniqueTypeState>;
  handleClickTechniqueShowModal: (show: string) => void;
  handleSubmit: (data: TechniqueState) => void;
}): JSX.Element => {
  const { techniqueTypes, handleClickTechniqueShowModal, handleSubmit } = props;
  const methods = useForm();
  return (
    <>
      <div id="overlay" onClick={() => handleClickTechniqueShowModal("")}>
        <div id="content" onClick={(e) => e.stopPropagation()}>
          <p>登録する技術の情報を入力してください</p>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <CustomRadioField
                name="techniqueType.name"
                label="TechniqueType"
                defaultValue={null}
                values={techniqueTypes}
                customStyle={null}
              />
              <CustomInput
                label="Technique"
                name={"name"}
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
                name={"version"}
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
                onClick={() => handleClickTechniqueShowModal("")}
              >
                close
              </Button>
              <Button
                style={{ margin: 8 }}
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                disabled={useStoreState().network.loading}
              >
                register
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default TechniqueCreateModal;
