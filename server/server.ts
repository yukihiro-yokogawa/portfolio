import express from 'express';
import next from 'next';
// import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(
		'/api',
		createProxyMiddleware({
			target: dev ? 'http://localhost:8080' : 'https://yoko-portfolio-backend.herokuapp.com/',
			changeOrigin: true,
		}),
	);

	// server.use(express.json());

	// server.get('/api/project/get', (_req, res) => {
	// 	axios.get(`http://localhost:8080/api/project/get`).then((response) => {
	// 		res.send(response.data);
	// 	});
	// });

	// server.get('/api/technique/get', (_req, res) => {
	// 	axios.get(`http://localhost:8080/api/technique/get`).then((response) => {
	// 		res.send(response.data);
	// 	});
	// });

	// server.get('/api/technique/post', (req) => {
	// 	axios.post(`http://localhost:8080/api/technique/post`, req.body);
	// });

	// server.get('/api/about/get', (_req, res) => {
	// 	axios.get(`http://localhost:8080/api/about/get`).then((response) => {
	// 		res.send(response.data);
	// 	});
	// });

	// server.get('/api/technique/get', (_req, res) => {
	// 	axios.get(`http://localhost:8080/api/technique/get`).then((response) => {
	// 		res.send(response.data);
	// 	});
	// });

	// server.get('/api/techniqueType/get', (_req, res) => {
	// 	axios.get(`http://localhost:8080/api/techniqueType/get`).then((response) => {
	// 		res.send(response.data);
	// 	});
	// });

	// server.get('/api/skill/get', (_req, res) => {
	// 	axios.get(`http://localhost:8080/api/skill/get`).then((response) => {
	// 		res.send(response.data);
	// 	});
	// });

	server.post('/api/technique/post', (req) => {
		console.log(req.body);
		console.log('post!');
	});

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err?: any) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
