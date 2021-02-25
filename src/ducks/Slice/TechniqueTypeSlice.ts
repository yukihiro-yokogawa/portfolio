import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TechniqueTypeState } from '~/Type/Technique';
import { requestFairure } from './NetworkSlice';

export const initialState: Array<TechniqueTypeState> = [{ id: 0, name: '', displayOrder: 0 }];

const techniqueTypeSlice = createSlice({
	name: 'techniqueType',
	initialState,
	reducers: {
		getTechniqueTypeRequest: (_state, action: PayloadAction<Array<TechniqueTypeState>>) => [...action.payload],
	},
});

export default techniqueTypeSlice;

export const { getTechniqueTypeRequest } = techniqueTypeSlice.actions;

export const getTechniqueTypeAsync = () => async (dispatch: (arg0: { payload: Array<TechniqueTypeState> }) => void): Promise<void> => {
	axios
		.get(`/api/techniqueType/get`)
		.then((response) => {
			dispatch(getTechniqueTypeRequest(response.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(requestFairure());
		});
};
