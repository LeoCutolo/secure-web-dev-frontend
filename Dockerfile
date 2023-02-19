FROM node:latest

WORKDIR /TD-Frontend

COPY ./package*.json .

RUN npm install

COPY . .

EXPOSE 8080

RUN npm install --save-dev dotenv 

RUN npm run build

RUN npm install -g http-server

ENTRYPOINT [ "http-server", "dist" ]: 
