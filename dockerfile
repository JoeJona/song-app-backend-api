FROM node:slim

WORKDIR /app

# COPY package.json ./
COPY .  /app

RUN npm install

EXPOSE 5000

CMD [ "node", "server.js" ]
