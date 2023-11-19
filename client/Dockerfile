# Use the official Node.js image as the base
FROM node:lts-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your client code to the container
COPY . .

# Expose the client port
EXPOSE 3000

# Start your React app
CMD ["npm", "start"]
