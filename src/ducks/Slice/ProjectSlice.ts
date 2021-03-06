import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProjectState } from "~/Type/Project";
import { requestFairure, requestLoading, requestSuccess } from "./NetworkSlice";

// デフォルトのstate
export const initialState: Array<ProjectState> = [
  {
    id: 0,
    name: "",
    startDate: "",
    endDate: "",
    addDate: "",
    gitUrl: "",
    projectTechniques: [],
    projectAbouts: [],
    projectImages: [],
  },
];

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // action
    getProjectsRequest: (
      _state,
      action: PayloadAction<Array<ProjectState>>
    ) => [...action.payload],
    getProjectFailure: (state) => ({
      ...state,
    }),
    postProjectRequest: (state, action: PayloadAction<ProjectState>) => ({
      ...state.concat(action.payload),
    }),
  },
});

export const {
  getProjectsRequest,
  getProjectFailure,
  postProjectRequest,
} = projectSlice.actions;

export default projectSlice;

// action実行関数
export const getProjectsAsync = () => async (
  dispatch: (arg0: { payload: Array<ProjectState>; type: string }) => void
): Promise<void> => {
  axios
    .get(`/api/project/get`, { params: { query: `GetProject` } })
    .then((response) => {
      dispatch(getProjectsRequest(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(requestFairure());
    });
};

export const getProjectByIdAsync = (id: number) => async (
  dispatch: (arg0: { payload: Array<ProjectState>; type: string }) => void
): Promise<void> => {
  axios
    .get(`/api/project/getOne`, {
      params: {
        query: "GetEditProject",
        id: id,
      },
    })
    .then((response) => {
      dispatch(getProjectsRequest(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(requestFairure());
    });
};

export const postProjectAsync = (project: ProjectState) => async (
  dispatch: (arg0: { payload: ProjectState; type: string }) => void
): Promise<void> => {
  dispatch(requestLoading());
  axios
    .post("/api/project/post", {
      params: { data: project, query: "PostProject" },
    })
    .then(() => {
      console.log(project);
      // dispatch(postProjectRequest(project));
      dispatch(requestSuccess());
    })
    .catch((err) => {
      console.log(err);
      dispatch(requestFairure());
    });
};
