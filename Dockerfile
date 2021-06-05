FROM node:15.0.1

ADD package.json .

RUN yarn

ADD . .

RUN yarn build

ENTRYPOINT ["yarn", "start"]
