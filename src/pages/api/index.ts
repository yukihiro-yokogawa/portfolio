import axios from 'axios';
import { NowRequest, NowResponse } from '@vercel/node';

const url = 'https://yoko-portfolio-backend.herokuapp.com';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (request: NowRequest, response: NowResponse) => {
	switch (request.query.query) {
		case 'GetProject':
			axios
				.get(`${url}/api/project/get`)
				.then((res) => {
					response.status(200).send(res.data);
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'GetProjectOne':
			axios
				.get(`${url}/api/project/getOne`, { params: { id: request.query.id } })
				.then((res) => {
					response.status(200).send(res.data);
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'GetTechnique':
			axios
				.get(`${url}/api/technique/get`)
				.then((res) => {
					response.status(200).send(res.data);
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'GetTechniqueType':
			axios
				.get(`${url}/api/techniqueType/get`)
				.then((res) => {
					response.status(200).send(res.data);
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'GetSkill':
			axios
				.get(`${url}/api/skill/get`)
				.then((res) => {
					response.status(200).send(res.data);
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'GetAbout':
			axios
				.get(`${url}/api/about/get`)
				.then((res) => {
					response.status(200).send(res.data);
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		default:
			response.status(404);
			break;
	}

	const data = request.body?.params?.data;

	switch (request.body?.params?.query) {
		case 'PostProject':
			axios
				.post(`${url}/api/project/post`, data)
				.then(() => {
					response.status(300).send('ok');
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'PostTechnique':
			axios
				.post(`${url}/api/technique/post`, data)
				.then(() => {
					response.status(300).send('ok');
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'PostAbout':
			axios
				.post(`${url}/api/about/post`, data)
				.then(() => {
					response.status(300).send('ok');
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		case 'PostSkill':
			axios
				.post(`${url}/api/skill/post`, data)
				.then(() => {
					response.status(300).send('ok');
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.statusText);
					console.log(error.response.headers);
				});
			break;
		default:
			response.status(404);
			break;
	}
};
