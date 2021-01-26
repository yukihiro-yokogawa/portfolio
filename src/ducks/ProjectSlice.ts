import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProjectStates } from '~/Type/Project';

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
	},
});

export const { getProjectRequest, getProjectFailure } = projectSlice.actions;

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
