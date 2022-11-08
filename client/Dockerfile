FROM node:16-alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm install --omit=dev

COPY ./ ./

RUN npm run build

EXPOSE 3000

USER node

CMD [ "npm", "start" ]