FROM node:alpine
RUN apk add --no-cache linux-headers make python g++
WORKDIR /app
COPY package.json .
RUN npm i mediasoup
COPY . .
CMD ["node","./src/index.js"]