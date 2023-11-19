const fs = require("fs");
require("dotenv").config();

module.exports = {
	development: {
		username: process.env.DEV_DB_USERNAME,
		password: process.env.DEV_DB_PASSWORD,
		database: process.env.DEV_DB_NAME,
		host: process.env.DEV_DB_HOSTNAME,
		port: process.env.DEV_DB_PORT,
		dialect: "postgres",
		// Use a different storage. Default: none
		seederStorage: "json",
		// Use a different file name. Default: sequelize-data.json
		seederStoragePath: "./db/sequelizeData.json",
		// Use a different table name. Default: SequelizeData
		seederStorageTableName: "sequelize_data",
		dialectOptions: {
			bigNumberStrings: true,
		},
		logging: console.log,
	},
	test: {
		username: process.env.CI_DB_USERNAME,
		password: process.env.CI_DB_PASSWORD,
		database: process.env.CI_DB_NAME,
		host: process.env.DB_HOSTNAME,
		port: process.env.DB_PORT,
		dialect: "postgres",
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	production: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: process.env.PROD_DB_PORT,
		dialect: "postgres",
		// Use a different storage. Default: none
		seederStorage: "json",
		// Use a different file name. Default: sequelize-data.json
		seederStoragePath: "./db/sequelizeData.json",
		// Use a different table name. Default: SequelizeData
		seederStorageTableName: "sequelize_data",
		dialectOptions: {
			bigNumberStrings: true,
		},
		logging: console.log,
	},
};

