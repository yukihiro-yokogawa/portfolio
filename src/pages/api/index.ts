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
				console.log('hello222');
				console.log(res.data);
				response.status(200).send(res.data);
			});
			break;
		case 'PostProject':
			console.log('PostProject');
			axios.post(`${url}/api/project/post`).then((res) => {
				console.log(res.data);
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
		case 'PostTechnique':
			console.log('PostTechnique');
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
		case 'PostAbout':
			console.log('PostAbout');
			axios.get(`${url}/api/about/post`).then((res) => {
				console.log(res.data);
				response.status(200).send(res.data);
			});
			break;
		default:
			break;
	}
};
