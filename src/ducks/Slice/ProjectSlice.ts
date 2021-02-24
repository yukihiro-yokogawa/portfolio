import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProjectState } from '~/Type/Project';

// デフォルトのstate
export const initialState: Array<ProjectState> = [
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
];

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		// action
		getProjectsRequest: (_state, action: PayloadAction<Array<ProjectState>>) => [...action.payload],
		getProjectFailure: (state) => ({
			...state,
		}),
		postProjectRequest: (state, action: PayloadAction<ProjectState>) => ({
			...state.concat(action.payload),
		}),
	},
});

export const { getProjectsRequest, getProjectFailure, postProjectRequest } = projectSlice.actions;

export default projectSlice;

// action実行関数
export const getProjectsAsync = () => async (dispatch: (arg0: { payload: Array<ProjectState>; type: string }) => void): Promise<void> => {
	axios.get(`/api/project/get`).then((response) => dispatch(getProjectsRequest(response.data)));
};

export const getProjectByIdAsync = (id: number) => async (
	dispatch: (arg0: { payload: Array<ProjectState>; type: string }) => void,
): Promise<void> => {
	axios
		.get(`/api/project/getOne`, {
			params: {
				id: id,
			},
		})
		.then((response) => {
			dispatch(getProjectsRequest(response.data));
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
