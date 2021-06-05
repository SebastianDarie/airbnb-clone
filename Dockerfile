FROM node as build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY packages/common ./packages/common
COPY packages/server ./packages/server
# COPY packages/server/.env.production ./packages/server/.env

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/common
RUN yarn build

WORKDIR /usr/src/app/packages/server
RUN yarn add -D typescript
RUN yarn build

FROM node

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY .env.production .env

COPY --from=build /usr/src/app/packages/common/package.json /usr/src/app/packages/common/package.json
COPY --from=build /usr/src/app/packages/common/dist /usr/src/app/packages/common/dist

COPY --from=build /usr/src/app/packages/server/package.json /usr/src/app/packages/server/package.json
COPY --from=build /usr/src/app/packages/server/dist /usr/src/app/packages/server/dist

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/packages/server

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node