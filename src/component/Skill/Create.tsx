import { Box, Button, Container, Fab } from "@material-ui/core";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import TechniqueCreateModal from "~/container/Modal/TechniqueCreateModal";
import { useStoreState } from "~/ducks/selector";
import { SkillsContext } from "~/pages/Skill/create";
import { SkillCreateState } from "~/Type/Skill";
import CustomAutoComplete from "../Form/CustomAutoComplete";
import CustomRadioField from "../Form/CustomRadioFIeld";

const create = (props: SkillCreateState): JSX.Element => {
  const {
    autoCompleteTechniques,
    autoCompleteVersions,
    handleChangeTechnique,
    handleSubmit,
  } = props;

  const [modal, setModal] = useState("");
  const handleClickShowModal = (show: string) => {
    setModal(show);
  };

  const skills = useContext(SkillsContext);

  const methods = useForm({
    defaultValues: {
      skills: skills,
    },
  });
  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <Container style={{ width: "80%", marginTop: 50 }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          {fields.map((field, index) => (
            <Box
              alignItems="center"
              width={1}
              display="flex"
              flexWrap="wrap"
              style={{ marginTop: "10px", justifyContent: " space-between" }}
              key={field.id}
            >
              <input
                type="hidden"
                name={`skills[${index}].deleted`}
                defaultValue={"false"}
                ref={methods.register()}
              />
              <CustomRadioField
                name={`skills[${index}].level`}
                label="level"
                defaultValue={skills[index]?.level}
                values={[
                  { name: "1" },
                  { name: "2" },
                  { name: "3" },
                  { name: "4" },
                  { name: "5" },
                ]}
                customStyle={{ width: "100%" }}
              />
              <CustomAutoComplete
                index={index}
                label="UseTechnique"
                name={`skills[${index}].technique.name`}
                required={true}
                length={0}
                url={false}
                date={false}
                value={field.technique.name}
                autoComplete={autoCompleteTechniques}
                placeholder="使用している技術名を入力してください"
                customStyle={{ width: "60%" }}
                handleChange={handleChangeTechnique}
              />
              <CustomAutoComplete
                index={index}
                label="version"
                name={`skills[${index}].technique.version`}
                required={true}
                length={0}
                url={false}
                date={false}
                value={field.technique.version}
                autoComplete={
                  _.find(autoCompleteVersions, (autoCompleteVersion) => {
                    return autoCompleteVersion?.id == index;
                  })?.autoComplete
                }
                placeholder="バージョンを入力してください"
                customStyle={{ width: "30%" }}
                handleChange={null}
              />
              <Fab
                aria-label="Delete"
                color="primary"
                size="small"
                style={{ width: "36px", height: "36px" }}
                onClick={() => {
                  remove(index);
                }}
              >
                ×
              </Fab>
            </Box>
          ))}
          <Button
            style={{ margin: 8 }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => handleClickShowModal("technique")}
          >
            Create
          </Button>
          <Button
            style={{ margin: 8 }}
            onClick={() => {
              append({});
            }}
            variant="contained"
            color="primary"
            size="medium"
          >
            add
          </Button>
          <Button
            type="submit"
            style={{ margin: 8 }}
            variant="contained"
            color="primary"
            size="medium"
            disabled={useStoreState().network.loading}
          >
            Submit
          </Button>
        </form>
      </FormProvider>
      {modal == "technique" ? (
        <TechniqueCreateModal
          handleClickTechniqueShowModal={handleClickShowModal}
        />
      ) : null}
    </Container>
  );
};

export default create;
