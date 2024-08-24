FROM node:18-alpine AS base
WORKDIR /app

RUN apk add --no-cache tzdata

COPY --chown=node:node package*.json /app/

RUN npm install

COPY . /app

ARG DEFAULT_PORT=3000
ARG NODE_ENV=development
ARG TZ=Asia/Ho-Chi-Minh

ENV NODE_ENV=$NODE_ENV
ENV APP_PORT=$DEFAULT_PORT
ENV TZ=$TZ

EXPOSE $APP_PORT

CMD ["npm", "run", "start"]
