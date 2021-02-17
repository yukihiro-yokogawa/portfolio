import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TechniqueState, TechniqueStates } from '~/Type/Technique';

// デフォルトのstate
export const initialState: TechniqueStates = {
	techniques: [],
};

const techniqueSlice = createSlice({
	name: 'technique',
	initialState,
	reducers: {
		//action
		getTechniqueRequest: (state, action: PayloadAction<TechniqueStates>) => ({
			...state,
			techniques: action.payload.techniques,
		}),
		postTechniqueRequest: (state, action: PayloadAction<TechniqueState>) => ({
			...state,
			techniques: state.techniques.concat(action.payload),
		}),
	},
});

export default techniqueSlice;

export const { getTechniqueRequest, postTechniqueRequest } = techniqueSlice.actions;

// action実行関数
export const getTechniquesAsync = () => async (dispatch: (arg0: { payload: TechniqueStates; type: string }) => void): Promise<void> => {
	axios.get(`/api/technique/get`).then((response) => {
		const techniques: TechniqueStates = {
			techniques: response.data,
		};
		// const newTechniques = {};
		// _.forEach(response.data, (technique) => {
		// 	if (typeof newTechniques[technique.techniqueType.name] === 'undefined') {
		// 		newTechniques[technique.techniqueType.name] = { [technique.name]: [technique] };
		// 	} else {
		// 		newTechniques[technique.techniqueType.name][technique.name].push(technique);
		// 	}
		// });
		dispatch(getTechniqueRequest(techniques));
	});
};

export const postTechniqueAsync = (technique: TechniqueState) => async (
	dispatch: (arg0: { payload: TechniqueState; type: string }) => void,
): Promise<void> => {
	console.log('test');
	const formData = new FormData();
	formData.append('technique', new Blob([JSON.stringify(technique)], { type: 'application/json' }));
	axios.post('/api/technique/post', formData);
	dispatch(postTechniqueRequest(technique));
};
