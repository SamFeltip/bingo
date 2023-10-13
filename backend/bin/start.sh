#!/bin/sh
# start.sh

# create db
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# Seed the database
npx sequelize-cli db:seed:all

# Start the application
npm run start:prod
