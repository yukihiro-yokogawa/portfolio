import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const server = express();
server.use(
	'/api',
	createProxyMiddleware({
		target: 'https://yoko-portfolio-backend.herokuapp.com/',
		changeOrigin: true,
	}),
);

export default server;
