ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-slim
WORKDIR /app
COPY package.json /app
RUN npm i \
&& npm audit fix
COPY . /app
WORKDIR /app/client
COPY /client/package.json /app/client
RUN npm i \
&& npm audit fix
WORKDIR /app
EXPOSE 3000 5000
ENTRYPOINT npm run dev

