FROM node:16.14.0-slim as base
WORKDIR /code
EXPOSE 8000
ENV NPM_CONFIG_LOGLEVEL warn
COPY package.json package-lock.json ./

FROM base AS dependencies
RUN npm install --silent --production

FROM dependencies AS develop
ENV NODE_ENV development
RUN npm install --silent --depth 0
COPY . .
RUN npm run build

CMD ["node", "./build/App.js"]
