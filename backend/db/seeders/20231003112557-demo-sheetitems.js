'use strict';

const {Sheet, SheetItem} = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const sunday_funday_bingo = await Sheet.findOne({where: {name: 'Sunday Funday Bingo'} })

		const sheetItemsData = [
			"John spills their drink",
			"unexpected karaoke performance",
			"conga line",
			"Emma takes a selfie",
			"someone tells a bad joke",
			"Mike loses their phone",
			"someone requests a song from the DJ",
			"Sarah starts a dance-off",
			"someone sings along loudly to a song",
			"David loses his drink",
			"someone talks about work at a party",
			"Lisa shows off a party trick",
			"'I love the food'",
			"Tom proposes a toast",
			"someone starts talking about their pet",
			"Sophie finds confetti in their drink",
			"someone tries to DJ",
			"James starts a hashtag",
			"crazy dancing",
			"Anna takes a group photo",
			"'can't wait for next year!'",
			"Chris finds an unexpected plus one",
			"Dan finds his new BFF",
			"Emily talks about their favorite movie",
			"someone can't stop laughing at a joke"
		];

		for (const itemText of sheetItemsData) {
			await SheetItem.create({
				text: itemText,
				createdAt: new Date(),
				updatedAt: new Date(),
				SheetId: sunday_funday_bingo.id
			});
		}
	},
	down: async (queryInterface, Sequelize) => {

		console.log('deleting sheet items')
		await queryInterface.bulkDelete('SheetItems', null, {});

	}
};
