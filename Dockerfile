FROM node:14.15.0-alpine as production

WORKDIR /usr/project/app

ENV NODE_ENV=production

COPY ./package.json ./

COPY ./public ./public
COPY ./tsconfig.json ./
COPY ./tsconfig.server.json ./
COPY ./next-env.d.ts ./
COPY ./src ./src
COPY ./server ./server

RUN npm install

RUN npm run build:next
RUN npm run build:server

CMD ["npm", "start"]