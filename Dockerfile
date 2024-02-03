# Base image
FROM node:21-alpine As production

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

#ARG
ARG PORT
ARG NODE_ENV

ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_HOST

#ENV
ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}

ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_HOST=${DB_HOST}

EXPOSE 3001

# Start the server using the production build
CMD [ "npm", "start" ]