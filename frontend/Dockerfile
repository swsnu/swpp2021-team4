FROM node:14.17.6

WORKDIR /usr/app

COPY package.json .
COPY src/ src/
COPY public/ public/

RUN npm install --silent
RUN yarn install --silent
RUN yarn add eslint-config-react-app -D
