import CustomInput from "../Form/CustomInput";
import { Box, Button, Container } from "@material-ui/core";
import CustomSelectField from "../Form/CustomSelectField";
import { WorkCreateState } from "~/Type/Work";
import React, { useContext, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useStoreState } from "~/ducks/selector";
import { Fab } from "@material-ui/core";
import TechniqueCreateModal from "~/container/Modal/TechniqueCreateModal";
import CustomAutoComplete from "../Form/CustomAutoComplete";
import _ from "lodash";
import AboutCreateModal from "~/container/Modal/AboutCreateModal";
import { ProjectContext } from "~/pages/Work/create";
import { getDateString } from "~/util/conversionUtils";

/**
 * Work新規追加フォームのViewコンポーネント.
 *
 * @param {WorkCreateState} props
 * @return {*}  {JSX.Element}
 */
const create = (props: WorkCreateState): JSX.Element => {
  const {
    abouts,
    aboutFieldList,
    autoCompleteTechniques,
    autoCompleteVersions,
    handleChangeTechnique,
    handleSubmit,
  } = props;

  const {
    id,
    name,
    startDate,
    endDate,
    addDate,
    gitUrl,
    projectAbouts,
    projectTechniques,
  } = useContext(ProjectContext);

  const [modal, setModal] = useState("");

  const handleClickShowModal = (show: string) => {
    setModal(show);
  };

  const methods = useForm({
    defaultValues: {
      projectTechniques: projectTechniques,
      projectAbouts: projectAbouts,
    },
  });
  const { control } = methods;

  const projectTechniqueFieldArray = useFieldArray({
    control,
    name: "projectTechniques",
  });

  const projectAboutFieldArray = useFieldArray({
    control,
    name: "projectAbouts",
  });

  return (
    <>
      <Container style={{ width: "80%", marginTop: 50 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <input
              type="hidden"
              name="id"
              value={id != null ? id : "0"}
              ref={methods.register()}
            />
            <CustomInput
              label="ProjectTitle"
              name="name"
              required={true}
              length={64}
              url={false}
              date={false}
              value={name}
              placeholder="プロジェクトのタイトルを入力してください"
              customStyle={null}
            />
            {projectTechniqueFieldArray.fields.map((field, index) => (
              <Box
                alignItems="center"
                width={1}
                display="flex"
                flexWrap="wrap"
                style={{ justifyContent: "space-between" }}
                key={field.id}
              >
                <CustomAutoComplete
                  index={index}
                  label="UseTechnique"
                  name={`projectTechniques[${index}].technique.name`}
                  required={true}
                  length={0}
                  url={false}
                  date={false}
                  value={field?.technique?.name}
                  autoCompletes={autoCompleteTechniques}
                  placeholder="使用している技術名を入力してください"
                  customStyle={{ width: "60%" }}
                  handleChange={handleChangeTechnique}
                />
                <CustomAutoComplete
                  index={index}
                  label="version"
                  name={`projectTechniques[${index}].technique.version`}
                  required={true}
                  length={0}
                  url={false}
                  date={false}
                  value={field?.technique?.version}
                  autoCompletes={
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
                    projectTechniqueFieldArray.remove(index);
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
              Technique Create
            </Button>
            <Button
              style={{ margin: 8 }}
              onClick={() => {
                projectTechniqueFieldArray.append({});
              }}
              variant="contained"
              color="primary"
              size="medium"
            >
              add
            </Button>
            <Box
              alignItems="center"
              width={1}
              display="flex"
              flexWrap="wrap"
              style={{ justifyContent: "space-between" }}
            >
              <CustomInput
                label="StartDate"
                name="startDate"
                required={false}
                length={0}
                url={false}
                date={true}
                value={
                  startDate != "" && startDate != null
                    ? getDateString(startDate)
                    : ""
                }
                placeholder="プロジェクトの開始日を入力してください"
                customStyle={{ width: "30%" }}
              />
              <CustomInput
                label="AddDate"
                name="addDate"
                required={false}
                length={0}
                url={false}
                date={true}
                value={
                  addDate !== "" && addDate !== null
                    ? getDateString(addDate)
                    : ""
                }
                placeholder="プロジェクトのリリース日を入力してください"
                customStyle={{ width: "30%" }}
              />
              <CustomInput
                label="EndDate"
                name="endDate"
                required={false}
                length={0}
                url={false}
                date={true}
                value={
                  endDate !== "" && endDate !== null
                    ? getDateString(endDate)
                    : ""
                }
                placeholder="プロジェクトの完了日を入力してください"
                customStyle={{ width: "30%" }}
              />
            </Box>
            <CustomInput
              label="GitUrl"
              name="gitUrl"
              required={true}
              length={512}
              url={true}
              date={false}
              value={gitUrl}
              placeholder="GitのURLを入力してください"
              customStyle={null}
            />
            <CustomSelectField
              label="ProjectAbouts"
              selectValue={abouts}
              editSelectValue={aboutFieldList}
              customStyle={null}
              handleClick={(e) => {
                if (e.length > projectAboutFieldArray?.fields?.length) {
                  projectAboutFieldArray.append({
                    about: { name: e[e.length - 1] },
                  });
                } else if (e.length < projectAboutFieldArray?.fields?.length) {
                  const index = _.filter(
                    projectAboutFieldArray.fields,
                    (field, index) => {
                      return field?.about?.name === e[Number(index)];
                    }
                  ).length;
                  projectAboutFieldArray.remove(index);
                }
              }}
            />
            {projectAboutFieldArray.fields.map((field, index) => (
              <Box key={field.id}>
                <input
                  type="hidden"
                  name={`projectAbouts[${index}].about.name`}
                  value={field?.about?.name}
                  ref={methods.register({})}
                />
                <CustomInput
                  label={field?.about?.name}
                  name={`projectAbouts[${index}].description`}
                  required={true}
                  length={512}
                  value={field?.description}
                  url={false}
                  date={false}
                  placeholder={`を入力してください`}
                  customStyle={null}
                />
              </Box>
            ))}
            <Button
              style={{ margin: 8 }}
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => handleClickShowModal("about")}
            >
              About Create
            </Button>
            <br />
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
        ) : modal == "about" ? (
          <AboutCreateModal handleClickAboutShowModal={handleClickShowModal} />
        ) : null}
      </Container>
    </>
  );
};

export default create;
