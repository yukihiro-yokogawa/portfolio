import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProjectState, ProjectStates } from '~/Type/Project';

// デフォルトのstate
export const initialState: ProjectStates = {
	projects: [
		{
			id: 0,
			name: '',
			startDate: '',
			endDate: '',
			addDate: '',
			gitUrl: '',
			projectTechniques: [],
			projectAbouts: [],
			projectImages: [],
		},
	],
};

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		// action
		getProjectsRequest: (state, action: PayloadAction<ProjectStates>) => ({
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

export const { getProjectsRequest, getProjectFailure, postProjectRequest } = projectSlice.actions;

export default projectSlice;

// action実行関数
export const getProjectsAsync = () => async (dispatch: (arg0: { payload: ProjectStates; type: string }) => void): Promise<void> => {
	axios.get(`/api/project/get`).then((response) => {
		const projects: ProjectStates = {
			projects: response.data,
		};
		dispatch(getProjectsRequest(projects));
	});
};

export const getProjectByIdAsync = (id: number) => async (
	dispatch: (arg0: { payload: ProjectStates; type: string }) => void,
): Promise<void> => {
	axios
		.get(`/api/project/getOne`, {
			params: {
				id: id,
			},
		})
		.then((response) => {
			const projects: ProjectStates = { projects: response.data };
			dispatch(getProjectsRequest(projects));
		});
};

export const postProjectAsync = (project: ProjectState) => async (
	dispatch: (arg0: { payload: ProjectState; type: string }) => void,
): Promise<void> => {
	const formData = new FormData();
	formData.append('project', new Blob([JSON.stringify(project)], { type: 'application/json' }));
	axios.post('/api/project/post', formData);
	dispatch(postProjectRequest(project));
};
