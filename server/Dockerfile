FROM node:16-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install --omit=dev

COPY ./ ./

EXPOSE 3001

USER node

CMD [ "npm", "start" ]
