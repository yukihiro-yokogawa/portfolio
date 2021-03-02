import express from 'express';
import next from 'next';
import axios from 'axios';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(express.json());

	server.get('/v1/project/get', (_req, res) => {
		axios.get(`http://localhost:8080/api/project/get`).then((response) => {
			res.send(response.data);
		});
	});

	server.get('/v1/project/getOne', (req, res) => {
		axios.get(`http://localhost:8080/api/project/getOne`, { params: { id: req.query.id } }).then((response) => {
			res.send(response.data);
		});
	});

	server.post('/v1/project/post', (req, res) => {
		axios.post(`http://localhost:8080/api/project/post`, req.body.params.data).then((response) => {
			res.send(response.data);
		});
	});

	server.get('/v1/technique/get', (_req, res) => {
		axios.get(`http://localhost:8080/api/technique/get`).then((response) => {
			res.send(response.data);
		});
	});

	server.post('/v1/technique/post', (req, res) => {
		axios.post(`http://localhost:8080/api/technique/post`, req.body.params.data).then((response) => {
			res.send(response.data);
		});
	});

	server.get('/v1/about/get', (_req, res) => {
		axios.get(`http://localhost:8080/api/about/get`).then((response) => {
			res.send(response.data);
		});
	});

	server.post('/v1/about/post', (req, res) => {
		axios.post(`http://localhost:8080/api/about/post`, req.body.params.data).then((response) => {
			res.send(response.data);
		});
	});

	server.get('/v1/techniqueType/get', (_req, res) => {
		axios.get(`http://localhost:8080/api/techniqueType/get`).then((response) => {
			res.send(response.data);
		});
	});

	server.get('/v1/skill/get', (_req, res) => {
		axios.get(`http://localhost:8080/api/skill/get`).then((response) => {
			res.send(response.data);
		});
	});

	server.post('/v1/skill/post', (req, res) => {
		axios.post(`http://localhost:8080/api/skill/post`, req.body.params.data).then((response) => {
			res.send(response.data);
		});
	});

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err?: any) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
