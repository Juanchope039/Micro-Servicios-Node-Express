### STAGE 2: Build ###
FROM node:22-alpine AS build
#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
COPY --chown=node:node . .
#RUN npm install
RUN npm install
#CMD ["node", "src/app.js"]


EXPOSE 8081