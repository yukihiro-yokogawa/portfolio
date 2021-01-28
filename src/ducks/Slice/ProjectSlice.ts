import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProjectState, ProjectStates } from '~/Type/Project';

// デフォルトのstate
export const initialState: ProjectStates = {
	projects: [],
};

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		// action
		getProjectRequest: (state, action: PayloadAction<ProjectStates>) => ({
			...state,
			projects: action.payload.projects,
		}),
		getProjectFailure: (state) => ({
			...state,
		}),
		postProjectRequest: (state, action: PayloadAction<ProjectState>) => ({
			...state,
			projects: state.projects.concat(action.payload),
		}),
	},
});

export const { getProjectRequest, getProjectFailure, postProjectRequest } = projectSlice.actions;

export default projectSlice;

// action実行関数
export const getProjectsAsync = () => async (dispatch: (arg0: { payload: ProjectStates; type: string }) => void): Promise<void> => {
	axios.get(`/api/project/get`).then((response) => {
		const projects: ProjectStates = {
			projects: response.data,
		};
		dispatch(getProjectRequest(projects));
	});
};

export const postProjectAsync = (project: ProjectState) => async (
	dispatch: (arg0: { payload: ProjectState; type: string }) => void,
): Promise<void> => {
	axios.post('/api/project/post', project);
	dispatch(postProjectRequest(project));
};
