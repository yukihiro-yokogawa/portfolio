import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SkillState, SkillStates } from '~/Type/Skill';
import { requestFairure, requestLoading } from './NetworkSlice';

export const initialState: Array<SkillState> = [
	{
		id: 0,
		level: 0,
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
		postSkillRequest: (state, action: PayloadAction<SkillStates>) => [...state.concat(action.payload.skills)],
	},
});

export const { getSkillsRequest, postSkillRequest } = skillSlice.actions;

export default skillSlice;

export const getSkillsAsync = () => async (dispatch: (arg0: { payload: Array<SkillState> }) => void): Promise<void> => {
	axios
		.get(`/v1/skill/get`, { params: { query: 'GetSkill' } })
		.then((response) => {
			dispatch(getSkillsRequest(response.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(requestFairure());
		});
};

export const postSkillAsync = (skills: SkillStates) => async (dispatch: (arg0: { payload: SkillStates }) => void): Promise<void> => {
	dispatch(postSkillRequest(skills));
	dispatch(requestLoading());
	// axios
	// 	.post(`/v1/skill/post`, { params: { data: skills, query: 'PostSkill' } })
	// 	.then(() => {
	// 		dispatch(postSkillRequest(skills));
	//		dispatch(requestSuccess());
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		dispatch(requestFairure());
	// 	});
};
