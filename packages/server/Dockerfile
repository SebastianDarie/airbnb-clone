FROM node:lts-alpine as builder

WORKDIR /usr/src/app
COPY package.json ./

RUN yarn install --ignore-optional 

COPY . .
RUN yarn build

FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./

RUN yarn install --ignore-optional --frozen-lockfile --production

COPY --from=builder /usr/src/app/dist ./dist
COPY ormconfig.json ormconfig.json
COPY .env.production .env

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node