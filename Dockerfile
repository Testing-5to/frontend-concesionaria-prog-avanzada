FROM node:latest

WORKDIR /app

COPY package.json /app/package.json

COPY package-lock.json /app/package-lock.json

RUN npm install

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

CMD ["npm", "run", "start"]