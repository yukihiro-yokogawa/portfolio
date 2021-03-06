import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MyProfileState } from "~/Type/Profile";
import { requestFairure, requestLoading, requestSuccess } from "./NetworkSlice";
import _ from "lodash";

export const initialState: Array<MyProfileState> = [
  {
    id: 0,
    title: "",
    description: "",
    date: "",
    deleted: false,
    profile: { id: 0, name: "", dateType: false, displayOrder: 0 },
  },
];

const MyProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
    getMyProfileRequest: (
      _state,
      action: PayloadAction<Array<MyProfileState>>
    ) => [...action.payload],
    postMyProfileRequest: (
      _state,
      action: PayloadAction<Array<MyProfileState>>
    ) => [...action.payload],
  },
});

export default MyProfileSlice;

export const {
  getMyProfileRequest,
  postMyProfileRequest,
} = MyProfileSlice.actions;

export const getMyProfileAsync = () => async (
  dispatch: (arg0: { payload: Array<MyProfileState>; type: string }) => void
): Promise<void> => {
  axios
    .get(`/api/my_profile/get`, { params: { query: "GetMyProfile" } })
    .then((response) => {
      dispatch(
        getMyProfileRequest(_.orderBy(response.data, "profile.displayOrder"))
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch(requestFairure());
    });
};

export const postMyProfileAsync = (myProfiles: Array<MyProfileState>) => async (
  dispatch: (arg0: { payload: Array<MyProfileState>; type: string }) => void
): Promise<void> => {
  dispatch(requestLoading());
  axios
    .post("/api/my_profile/post", {
      params: { data: myProfiles, query: "PostMyProfile" },
    })
    .then((response) => {
      dispatch(postMyProfileRequest(response.data));
      dispatch(requestSuccess());
    })
    .catch((err) => {
      console.log(err);
      dispatch(requestFairure());
    });
};
