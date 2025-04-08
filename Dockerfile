FROM node:18

WORKDIR /usr/src/app

ARG NEXT_PUBLIC_API_GATEWAY

ENV NEXT_PUBLIC_API_GATEWAY=$NEXT_PUBLIC_API_GATEWAY

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
