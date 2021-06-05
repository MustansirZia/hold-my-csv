FROM node:14.16.1

ADD package.json .

ADD yarn.lock .

RUN yarn

ADD . .

RUN yarn build

ENTRYPOINT ["yarn", "start"]
