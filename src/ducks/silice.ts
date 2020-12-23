import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProjectStates } from '~/Type/Project';
const hostname = location.hostname;
const url = hostname === 'localhost' ? 'http://localhost:8080' : '';

export const initialState: ProjectStates = {
	project: [
		{
			id: 0,
			name: '',
			startDate: '',
			endDate: '',
			addDate: '',
			projectTechniques: [
				{
					id: 0,
					technique: {
						id: 0,
						name: '',
						virsion: '',
					},
				},
			],
			projectAbouts: [
				{
					id: 0,
					description: '',
					displayPrder: 0,
					about: {
						id: 0,
						name: '',
					},
				},
			],
			projectImages: [
				{
					id: 0,
					image: '',
				},
			],
		},
	],
};

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		getProjectRequest: (state, action: PayloadAction<ProjectStates>) => ({
			...state,
			items: action.payload,
		}),
		getProjectFailure: (state) => ({
			...state,
		}),
	},
});

export const { getProjectRequest } = projectSlice.actions;

export default projectSlice;

export const getAnnimeAsync = (id: number) => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
	await axios.get(`${url}/api/project/id=${id}`).then((response) => {
		const projects: ProjectStates = { project: response.data };
		dispatch(getProjectRequest(projects));
	});
};
