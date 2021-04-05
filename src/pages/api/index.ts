import axios from 'axios';
import { NowRequest, NowResponse } from '@vercel/node';

const url = 'https://yoko-portfolio-backend.herokuapp.com';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (request: NowRequest, response: NowResponse) => {
	const getRequest = (query: string, queryParameter: any) => {
		axios
			.get(`${url}${query}`, { params: queryParameter, timeout: 30000 })
			.then((res) => {
				response.status(200).send(res.data);
			})
			.catch((error) => {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.statusText);
				console.log(error.response.headers);
				response.status(error.statusCode).send(error);
			});
	};

	const postRequest = (query: string, data: any) => {
		axios
			.post(`${url}${query}`, data, { timeout: 30000 })
			.then(() => {
				response.status(200).send('ok');
			})
			.catch((error) => {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.statusText);
				console.log(error.response.headers);
				response.status(error.statusCode).send(error);
			});
	};

	switch (request.query.query) {
		case 'GetProfile':
			getRequest('/api/profile/get', null);
			break;
		case 'GetMyProfile':
			getRequest('/api/my_profile/get', null);
			break;
		case 'GetProject':
			getRequest('/api/project/get', null);
			break;
		case 'GetEditProject':
			getRequest('/api/project/getOne', { id: request.query.id });
			break;
		case 'GetTechnique':
			getRequest('/api/technique/get', null);
			break;
		case 'GetTechniqueType':
			getRequest('/api/techniqueType/get', null);
			break;
		case 'GetSkill':
			getRequest('/api/skill/get', null);
			break;
		case 'GetSkillDeleted':
			getRequest('/api/skill/getDeleted', null);
			break;
		case 'GetAbout':
			getRequest('/api/about/get', null);
			break;
		default:
			response.status(404);
			break;
	}

	const data = request.body?.params?.data;

	switch (request.body?.params?.query) {
		case 'PostProject':
			postRequest('/api/project/post', data);
			break;
		case 'PostMyProfile':
			postRequest('/api/my_profile/post', data);
			break;
		case 'PostTechnique':
			postRequest('/api/technique/post', data);
			break;
		case 'PostAbout':
			postRequest('/api/about/post', data);
			break;
		case 'PostSkill':
			postRequest('/api/skill/post', data);
			break;
		default:
			response.status(404);
			break;
	}
};
