import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SkillState } from '~/Type/Skill';
import { requestFairure } from './NetworkSlice';

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
	},
});

export const { getSkillsRequest } = skillSlice.actions;

export default skillSlice;

export const getSkillsAsync = () => async (dispatch: (arg0: { payload: Array<SkillState> }) => void): Promise<void> => {
	axios
		.get(`/api/skill/get`)
		.then((response) => {
			dispatch(getSkillsRequest(response.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(requestFairure());
		});
};
