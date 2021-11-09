FROM node:lts-alpine as build_frontend

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN apk update
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

# install app dependencies
COPY frontend/package.json ./
COPY frontend/package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY ./frontend/ ./frontend

WORKDIR /app/frontend

RUN npm run-script build


FROM node:lts-alpine

WORKDIR /app

COPY backend/ .

RUN npm install

COPY --from=build_frontend /app/frontend/build ./built_frontend

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "start" ]