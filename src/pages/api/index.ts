import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
console.log(dev);

dev
	? app.prepare().then(() => {
			server.use(
				'/api',
				createProxyMiddleware({
					target: 'http://localhost:8080',
					changeOrigin: true,
				}),
			);

			server.all('*', (req, res) => {
				return handle(req, res);
			});

			server.listen(port, (err?: any) => {
				if (err) throw err;
				console.log(`> Ready on http://localhost:${port}`);
			});
	  })
	: server.use(
			'/api',
			createProxyMiddleware({
				target: 'https://yoko-portfolio-backend.herokuapp.com/',
				changeOrigin: true,
			}),
	  );

export default server;
