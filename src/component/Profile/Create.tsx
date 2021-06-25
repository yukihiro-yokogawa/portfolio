import { Box, Button, Container, Fab } from "@material-ui/core";
import React, { useContext, useMemo } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useStoreState } from "~/ducks/selector";
import { MyProfileState, ProfileCreateState } from "~/Type/Profile";
import CustomInput from "../Form/CustomInput";
import _ from "lodash";
import { getDateString } from "~/util/conversionUtils";
import { MyProfilesContext } from "~/pages/Profile/create";

const create = (props: ProfileCreateState) => {
  let introduction: MyProfileState;
  const careers: Array<any> = [];
  const profiles = useStoreState().profiles;
  const myProfiles = useContext(MyProfilesContext);
  const { handleSubmit } = props;

  const createIntroduction = useMemo(() => {
    _.forEach(myProfiles, (myProfile) => {
      if (!myProfile.profile.dateType) {
        introduction = myProfile;
      }
    });
    return introduction;
  }, [myProfiles]);

  const createCareers = useMemo(() => {
    _.forEach(myProfiles, (myProfile) => {
      if (myProfile.profile.dateType) {
        const newMyProfile = {
          myProfileId: myProfile.id,
          title: myProfile.title,
          description: myProfile.description,
          date: getDateString(myProfile.date),
          profile: myProfile.profile,
          deleted: myProfile.deleted,
        };
        careers.push(newMyProfile);
      }
    });
    return careers;
  }, [myProfiles]);

  const methods = useForm({
    defaultValues: {
      introduction: createIntroduction,
      careers: createCareers,
    },
  });

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "careers",
  });

  return (
    <Container style={{ width: "80%", marginTop: 50 }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          {profiles.map((profile) => (
            <Box key={profile.name} alignItems="center" width={1}>
              <h3 className="title">{profile.name}</h3>
              <>
                {profile.dateType === true ? (
                  <>
                    {fields.map((field, index2) => (
                      <Box
                        alignItems="center"
                        width={1}
                        display="flex"
                        flexWrap="wrap"
                        style={{ justifyContent: "space-between" }}
                        key={field.id}
                      >
                        <input
                          type="hidden"
                          name={`careers[${index2}].myProfileId`}
                          defaultValue={
                            field.myProfileId && field.myProfileId !== ""
                              ? field.myProfileId
                              : 0
                          }
                          ref={methods.register()}
                        />
                        <input
                          type="hidden"
                          name={`careers[${index2}].deleted`}
                          defaultValue={"false"}
                          ref={methods.register()}
                        />
                        <input
                          type="hidden"
                          name={`careers[${index2}].profile.id`}
                          defaultValue={profile.id != null ? profile.id : "0"}
                          ref={methods.register()}
                        />
                        <input
                          type="hidden"
                          name={`careers[${index2}].profile.dateType`}
                          defaultValue={`${profile.dateType}`}
                          ref={methods.register()}
                        />
                        <input
                          type="hidden"
                          name={`careers[${index2}].profile.displayOrder`}
                          defaultValue={profile.displayOrder}
                          ref={methods.register()}
                        />
                        <input
                          type="hidden"
                          name={`careers[${index2}].profile.name`}
                          defaultValue={profile.name}
                          ref={methods.register()}
                        />
                        <CustomInput
                          label={`${profile.name}の日付`}
                          name={`careers[${index2}].date`}
                          required={false}
                          length={0}
                          url={false}
                          date={true}
                          value={field.date}
                          placeholder={`${profile.name}の日付を入力してください。`}
                          customStyle={{ width: "30%" }}
                        />
                        <CustomInput
                          label={`${profile.name}のタイトル`}
                          name={`careers[${index2}].title`}
                          required={false}
                          length={64}
                          url={false}
                          date={false}
                          value={field.title}
                          placeholder={`${profile.name}のタイトルを入力してください。`}
                          customStyle={{ width: "60%" }}
                        />
                        <CustomInput
                          label={profile.name}
                          name={`careers[${index2}].description`}
                          required={false}
                          length={1024}
                          url={false}
                          date={false}
                          value={field.description}
                          placeholder={`${profile.name}の概要を入力してください`}
                          customStyle={{ width: "90%" }}
                        />
                        <Fab
                          aria-label="Delete"
                          color="primary"
                          size="small"
                          style={{ width: "36px", height: "36px" }}
                          onClick={() => {
                            remove(index2);
                          }}
                        >
                          ×
                        </Fab>
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    <input
                      type="hidden"
                      name={`introduction.deleted`}
                      ref={methods.register}
                    />
                    <input
                      type="hidden"
                      name={`introduction.id`}
                      ref={methods.register}
                    />
                    <input
                      type="hidden"
                      name={`introduction.title`}
                      ref={methods.register}
                    />
                    <input
                      type="hidden"
                      name={`introduction.date`}
                      ref={methods.register}
                    />
                    <input
                      type="hidden"
                      name={`introduction.profile.id`}
                      value={profile.id != null ? profile.id : "0"}
                      ref={methods.register}
                    />
                    <input
                      type="hidden"
                      name={`introduction.profile.dateType`}
                      value={`${profile.dateType}`}
                      ref={methods.register}
                    />
                    <input
                      type="hidden"
                      name={`introduction.profile.displayOrder`}
                      value={profile.displayOrder}
                      ref={methods.register}
                    />
                    <input
                      type="hidden"
                      name={`introduction.profile.name`}
                      value={profile.name}
                      ref={methods.register}
                    />
                    <CustomInput
                      label={profile.name}
                      name={`introduction.description`}
                      required={false}
                      length={1024}
                      url={false}
                      date={false}
                      value=""
                      placeholder={`${profile.name}の概要を入力してください`}
                      customStyle={null}
                    />
                  </>
                )}
              </>
              {profile.dateType === true ? (
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
              ) : null}
            </Box>
          ))}
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
    </Container>
  );
};

export default create;
