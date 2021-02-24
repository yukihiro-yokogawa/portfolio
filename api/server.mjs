import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
console.log(process.env.NODE_ENV);

app.prepare().then(() => {
	const server = express();

	server.use(
		'/api',
		createProxyMiddleware({
			target: dev ? 'http://localhost:8080' : 'http://localhost:8080',
			changeOrigin: true,
		}),
	);

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});