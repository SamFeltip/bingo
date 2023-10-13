# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Make port 5000 available to the world outside this container
# EXPOSE 5000

RUN chmod +x ./bin/wait-for-it.sh

# Run the app when the container launches
CMD ["./bin/start.sh"]
