import axios from 'axios';
import { NowRequest, NowResponse } from '@vercel/node';

const url = 'https://yoko-portfolio-backend.herokuapp.com/';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (request: NowRequest, response: NowResponse) => {
	console.log(request);

	switch (request.query.query) {
		case 'GetProject':
			console.log('GetProject');
			axios.get(`${url}/api/project/get`).then((res) => {
				response.status(200).send(res.data);
			});
			break;
		case 'GetTechnique':
			console.log('GetTechnique');
			axios.get(`${url}/api/technique/get`).then((res) => {
				console.log(res.data);
				response.status(200).send(res.data);
			});
			break;
		case 'GetTechniqueType':
			console.log('GetTechniqueType');
			axios.get(`${url}/api/techniqueType/get`).then((res) => {
				console.log(res.data);
				response.status(200).send(res.data);
			});
			break;
		case 'GetSkill':
			console.log('GetSkill');
			axios.get(`${url}/api/skill/get`).then((res) => {
				console.log(res.data);
				response.status(200).send(res.data);
			});
			break;
		case 'GetAbout':
			console.log('GetAbout');
			axios.get(`${url}/api/about/get`).then((res) => {
				console.log(res.data);
				response.status(200).send(res.data);
			});
			break;
		default:
			break;
	}

	const data = request.body?.params?.data;

	switch (request.body?.params?.query) {
		case 'PostProject':
			axios.post(`${url}/api/project/post`, data).then(() => {
				console.log('PostProject');
				response.status(200).send('ok');
			});
			break;
		case 'PostTechnique':
			axios.post(`${url}/api/technique/post`, data).then(() => {
				console.log('PostTechnique');
				response.status(200).send('ok');
			});
			break;
		case 'PostAbout':
			axios.post(`${url}/api/about/post`, data).then(() => {
				console.log('PostProject');
				response.status(200).send('ok');
			});
			break;
		default:
			break;
	}
};
