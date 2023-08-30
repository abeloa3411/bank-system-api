FROM node:alpine
WORKDIR /usr/src/index
COPY package*.json .
RUN npm ci
COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]