FROM node:12 as build

WORKDIR /app/bin-backend

COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

CMD npm start