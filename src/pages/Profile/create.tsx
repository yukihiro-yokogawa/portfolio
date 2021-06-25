import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import Create from "~/container/Profile/Create";
import { getProfilesAsync } from "~/ducks/Slice/ProfileSlice";

export const MyProfilesContext: React.Context<any> = createContext({});

const create = (props: { myProfiles: any }): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfilesAsync());
  }, [dispatch]);

  return (
    <MyProfilesContext.Provider value={props.myProfiles}>
      <div>
        <Create />
      </div>
    </MyProfilesContext.Provider>
  );
};

export default create;

create.getInitialProps = async ({ query }) => {
  const myProfiles = JSON.parse(query.param);
  console.log(myProfiles);
  return { myProfiles: myProfiles };
};
