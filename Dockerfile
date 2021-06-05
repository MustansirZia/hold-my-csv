FROM node:14.17.0

ADD package.json .

RUN yarn

ADD . .

RUN yarn build

ENTRYPOINT ["yarn", "start"]
