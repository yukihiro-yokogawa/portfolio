import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SkillState, SkillStates } from '~/Type/Skill';
import { requestFairure, requestLoading, requestSuccess } from './NetworkSlice';

export const initialState: Array<SkillState> = [
	{
		id: 0,
		level: 0,
		deleted: false,
		technique: {
			id: 0,
			name: '',
			version: '',
			techniqueType: { id: 0, name: '', displayOrder: 0 },
		},
	},
];

const skillSlice = createSlice({
	name: 'skill',
	initialState,
	reducers: {
		//action
		getSkillsRequest: (_state, action: PayloadAction<Array<SkillState>>) => [...action.payload],
		postSkillRequest: (_state, action: PayloadAction<SkillStates>) => [...action.payload.skills],
	},
});

export const { getSkillsRequest, postSkillRequest } = skillSlice.actions;

export default skillSlice;

export const getSkillsAsync = () => async (dispatch: (arg0: { payload: Array<SkillState> }) => void): Promise<void> => {
	axios
		.get(`/api/skill/get`, { params: { query: 'GetSkill' } })
		.then((response) => {
			dispatch(getSkillsRequest(response.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(requestFairure());
		});
};

export const postSkillAsync = (data: SkillStates) => async (dispatch: (arg0: { payload: SkillStates }) => void): Promise<void> => {
	dispatch(requestLoading());
	axios
		.post(`/api/skill/post`, { params: { data: data.skills, query: 'PostSkill' } })
		.then(() => {
			dispatch(postSkillRequest(data));
			dispatch(requestSuccess());
		})
		.catch((err) => {
			console.log(err);
			dispatch(requestFairure());
		});
};
