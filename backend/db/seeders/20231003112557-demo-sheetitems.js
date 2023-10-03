'use strict';

const {Sheet} = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const sheet_obj = await Sheet.findOne({where: {name: 'Friday Night Bingo'} })
		const sheet = sheet_obj.dataValues

		// Add demo sheetItems
		await queryInterface.bulkInsert('SheetItems', [
				{
					SheetId: sheet.id,
					text: "John spills their drink",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "unexpected karaoke performance",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "conga line",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Emma takes a selfie",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "someone tells a bad joke",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Mike loses their phone",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "someone requests a song from the DJ",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Sarah starts a dance-off",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "someone sings along loudly to a song",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "David looses his drink",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "someone talks about work at a party",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Lisa shows off a party trick",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "'I love the food'",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Tom proposes a toast",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "someone starts talking about their pet",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Sophie finds confetti in their drink",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "someone tries to DJ",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "James starts a hashtag",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "crazy dancing",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Anna takes a group photo",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "'cant wait for next year!'",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Chris finds an unexpected plus one",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "dan finds his new BFF",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "Emily talks about their favorite movie",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					SheetId: sheet.id,
					text: "someone can't stop laughing at a joke",
					createdAt: new Date(),
					updatedAt: new Date()
				}
		]);
	},
	down: async (queryInterface, Sequelize) => {

		console.log('deleting sheet items')
		await queryInterface.bulkDelete('SheetItems', null, {});

	}
};
