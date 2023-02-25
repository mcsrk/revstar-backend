FROM node:16-alpine

WORKDIR /revstar_api

ENV PORT 3000

# Copy package.json and package-lock.json files
COPY package*.json /revstar_api/

COPY . /revstar_api/

# Copy environment variables
COPY .env ./

# Install all dependencies
RUN npm install

EXPOSE 3000

CMD npm start

