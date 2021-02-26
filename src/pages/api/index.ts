import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const server = express();

server.use(
	'/v1',
	createProxyMiddleware({
		target: 'https://yoko-portfolio-backend.herokuapp.com/',
		changeOrigin: true,
	}),
	express.json(),
);

export default server;
