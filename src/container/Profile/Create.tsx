import React, { useContext } from "react";
import Create from "~/component/Profile/Create";
import { MyProfilesDataState, MyProfileState } from "~/Type/Profile";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { postMyProfileAsync } from "~/ducks/Slice/MyProfileSlice";
import { MyProfilesContext } from "~/pages/Profile/create";
import { getDateString } from "~/util/conversionUtils";

const create = (): JSX.Element => {
  const dispatch = useDispatch();
  const myProfiles = useContext(MyProfilesContext);

  const handleSubmit = (profilesDataForm: MyProfilesDataState) => {
    let oldSkills = _.cloneDeep(myProfiles);
    const newMyProfiles = [];
    newMyProfiles.push(profilesDataForm.introduction);
    _.forEach(profilesDataForm.careers, (profileData) => {
      const newProfileData: MyProfileState = {
        id: Number(profileData.myProfileId),
        title: profileData.title,
        description: profileData.description,
        date: profileData.date,
        deleted: profileData.deleted,
        profile: profileData.profile,
      };
      newMyProfiles.push(newProfileData);
      _.remove(oldSkills, (oldSkill: any) => {
        return oldSkill.id === newProfileData.id;
      });
    });
    _.forEach(oldSkills, (oldSkill) => {
      oldSkill?.profile?.name !== "自己紹介"
        ? newMyProfiles.push({
            ...oldSkill,
            date: getDateString(oldSkill.date),
            deleted: "true",
          })
        : null;
    });
    dispatch(postMyProfileAsync(newMyProfiles));
  };

  return (
    <>
      <Create handleSubmit={handleSubmit} />
    </>
  );
};

export default create;
