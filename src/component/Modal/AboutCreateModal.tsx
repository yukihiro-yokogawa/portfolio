import { Button } from "@material-ui/core";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useStoreState } from "~/ducks/selector";
import { AboutState } from "~/Type/About";
import CustomInput from "../Form/CustomInput";

const AboutCreateModal = (props: {
  handleClickAboutShowModal: (show: string) => void;
  handleSubmit: (data: AboutState) => void;
}): JSX.Element => {
  const { handleClickAboutShowModal, handleSubmit } = props;
  const methods = useForm();
  return (
    <div id="overlay" onClick={() => handleClickAboutShowModal("")}>
      <div id="content" onClick={(e) => e.stopPropagation()}>
        <p>登録したいプロジェクトの詳細項目を入力してください</p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <CustomInput
              label="About"
              name={"name"}
              required={true}
              length={32}
              url={false}
              date={false}
              value=""
              placeholder="登録したいプロジェクトの詳細項目名を入力してください"
              customStyle={null}
            />
            <Button
              style={{ margin: 8 }}
              variant="contained"
              color="primary"
              size="medium"
              type="button"
              onClick={() => handleClickAboutShowModal("")}
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
  );
};

export default AboutCreateModal;
