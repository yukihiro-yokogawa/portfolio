import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TechniqueTypeStates } from '~/Type/Technique';

export const initialState: TechniqueTypeStates = {
	techniqueTypes: [],
};

const techniqueTypeSlice = createSlice({
	name: 'techniqueType',
	initialState,
	reducers: {
		getTechniqueTypeRequest: (state, action: PayloadAction<TechniqueTypeStates>) => ({
			...state,
			techniqueTypes: action.payload.techniqueTypes,
		}),
	},
});

export default techniqueTypeSlice;

export const { getTechniqueTypeRequest } = techniqueTypeSlice.actions;

export const getTechniqueTypeAsync = () => async (dispatch: (arg0: { payload: TechniqueTypeStates }) => void): Promise<void> => {
	axios.get(`/api/techniqueType/get`).then((response) => {
		const techniqueTypes: TechniqueTypeStates = {
			techniqueTypes: response.data,
		};
		dispatch(getTechniqueTypeRequest(techniqueTypes));
	});
};
