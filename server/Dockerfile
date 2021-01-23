# Install node image in container
FROM node:lts-alpine3.10

# Create and set the working directory
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

# Copy the dependency files over
COPY package*.json /usr/src/app/server/

# Install dependencies
RUN npm install --silent --production=true

# Copy the server files over
COPY . /usr/src/app/server/

# Heroku does not support this
# EXPOSE 80

# Command to run them
CMD ["npm", "start"]