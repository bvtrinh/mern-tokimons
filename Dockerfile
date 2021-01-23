# Build React app
FROM node:lts-alpine3.10

# Setup client directory
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY ./client/package*.json /usr/src/app/client/

# Install dependencies (need devDependencies to build TS files?)
RUN npm install --silent

# Copy for client src files
COPY ./client /usr/src/app/client/

# Create the production build
RUN npm run build

# Setup server directory
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

# Copy the dependency files over
COPY ./server/package*.json /usr/src/app/server/

# Install dependencies
RUN npm install --silent --production=true

# Copy the server files over
COPY ./server /usr/src/app/server/

# Command to run them
EXPOSE 80 
CMD ["npm", "start"]