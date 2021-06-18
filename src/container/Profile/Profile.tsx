import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Profile from "~/component/Profile/Profile";
import { useStoreState } from "~/ducks/selector";
import { getMyProfileAsync } from "~/ducks/Slice/MyProfileSlice";
import { getProfilesAsync } from "~/ducks/Slice/ProfileSlice";
import _ from "lodash";

const profile = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfilesAsync());
    dispatch(getMyProfileAsync());
  }, [dispatch]);

  const customMyProfiles = () => {
    const newMyProfile = {};
    _.forEach(useStoreState().myProfiles, (myProfile) => {
      if (
        newMyProfile[myProfile.profile.displayOrder] !== undefined &&
        newMyProfile[myProfile.profile.displayOrder] !== null
      ) {
        newMyProfile[myProfile.profile.displayOrder].push(myProfile);
      } else {
        newMyProfile[myProfile.profile.displayOrder] = [myProfile];
      }
    });
    return newMyProfile;
  };

  return <Profile myProfiles={customMyProfiles()} />;
};

export default profile;
