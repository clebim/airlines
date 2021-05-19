FROM node:10-alpine

RUN apk update

ENV APP_SECRET d6c096960259d0c13d70ccbbff814ef3
ENV EXPIRES_IN 4h
ENV PORT 3333

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY ormconfig.json ./
COPY tsconfig-paths-bootstrap.js ./
COPY src /app/src

RUN npm install

RUN npm run build

RUN ls

RUN npm run migration

EXPOSE 3333

CMD ["npm", "start"]



