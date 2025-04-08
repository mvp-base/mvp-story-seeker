FROM node:18

WORKDIR /usr/src/app

ARG API_GATEWAY_URL

ENV API_GATEWAY_URL=$API_GATEWAY_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
