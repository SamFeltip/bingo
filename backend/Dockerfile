# Use the official Node.js image as the base
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code to the container
COPY . .

# Expose the server port
EXPOSE 4000

# Set build-time arguments
ARG POSTGRES_USER
ARG POSTGRES_DB
ARG POSTGRES_HOST

# Use the environment variables in your commands
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_DB=$POSTGRES_PASSWORD
ENV POSTGRES_HOST=$POSTGRES_HOST


CMD ["sh", "-c", "npm run db:migrate:up && npm run db:seeds:up && node index.js"]
