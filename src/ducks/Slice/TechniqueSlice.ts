import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TechniqueState } from "~/Type/Technique";
import { requestFairure, requestLoading, requestSuccess } from "./NetworkSlice";

// デフォルトのstate
export const initialState: Array<TechniqueState> = [
  {
    id: 0,
    name: "",
    version: "",
    techniqueType: { id: 0, name: "", displayOrder: 0 },
  },
];

const techniqueSlice = createSlice({
  name: "technique",
  initialState,
  reducers: {
    //action
    getTechniqueRequest: (
      _state,
      action: PayloadAction<Array<TechniqueState>>
    ) => [...action.payload],
    postTechniqueRequest: (state, action: PayloadAction<TechniqueState>) => [
      ...state.concat(action.payload),
    ],
  },
});

export default techniqueSlice;

export const {
  getTechniqueRequest,
  postTechniqueRequest,
} = techniqueSlice.actions;

// action実行関数
export const getTechniquesAsync = () => async (
  dispatch: (arg0: { payload: Array<TechniqueState>; type: string }) => void
): Promise<void> => {
  axios
    .get(`/api/technique/get`, { params: { query: "GetTechnique" } })
    .then((response) => {
      dispatch(getTechniqueRequest(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(requestFairure());
    });
};

export const postTechniqueAsync = (technique: TechniqueState) => async (
  dispatch: (arg0: { payload: TechniqueState; type: string }) => void
): Promise<void> => {
  dispatch(requestLoading());
  axios
    .post("/api/technique/post", {
      params: { data: technique, query: "PostTechnique" },
    })
    .then((response) => {
      dispatch(postTechniqueRequest(response.data));
      dispatch(requestSuccess());
    })
    .catch((err) => {
      console.log(err);
      dispatch(requestFairure());
    });
};
