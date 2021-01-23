# Install node image in container
FROM node:lts-alpine3.10

# Create and set the working directory
RUN mkdir -p /app/server
WORKDIR /app/server

# Copy the dependency files over
COPY package*.json /app/server/

# Install dependencies
RUN npm install --silent --production=true

# Copy the server files over
COPY . /app/server/

# Command to run them
CMD ["npm", "start"]