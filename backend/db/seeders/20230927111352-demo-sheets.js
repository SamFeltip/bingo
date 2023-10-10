"use strict";

const { Sheet } = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const friday_night_bingo = await Sheet.create({
			name: "Friday Night Bingo",
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const sunday_funday_bingo = await Sheet.create({
			name: "Sunday Funday Bingo",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	},

	down: async (queryInterface, Sequelize) => {
		console.log("deleting sheets");
		await queryInterface.bulkDelete("Sheets", null, {});
	},
};
