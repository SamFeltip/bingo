'use strict';

const {User, Sheet} = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {

		const user_objs = await User.findAll();
		const users = user_objs.map(user_obj => user_obj.dataValues)
		console.log(`users new count: ${users.length}`)

		// Add demo sheets
		await queryInterface.bulkInsert('Sheets', [
			{
				name: 'Friday Night Bingo',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Sunday Funday Bingo',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// add more sheets as needed
		], {returning: true});

		console.log('created 2 sheets')
		console.log(Sheet)

		const sheets_objs = await Sheet.findAll();
		const sheets = sheets_objs.map(sheet_obj => sheet_obj.dataValues)
		console.log(sheets)

		// Add demo participants
		await queryInterface.bulkInsert('Participants', [
			{
				UserId: users.find(user => user.name === 'JohnDoe').id,
				SheetId: sheets.find(sheet => sheet.name === 'Friday Night Bingo').id,
				isOwner: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				UserId: users.find(user => user.name === 'JaneSmith').id,
				SheetId: sheets.find(sheet => sheet.name === 'Friday Night Bingo').id,
				isOwner: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				UserId: users.find(user => user.name === 'Samuel Felton').id,
				SheetId: sheets.find(sheet => sheet.name === 'Friday Night Bingo').id,
				isOwner: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				UserId: users.find(user => user.name === 'Samuel Felton').id,
				SheetId: sheets.find(sheet => sheet.name === 'Sunday Funday Bingo').id,
				isOwner: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				UserId: users.find(user => user.name === 'JaneSmith').id,
				SheetId: sheets.find(sheet => sheet.name === 'Sunday Funday Bingo').id,
				isOwner: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// add more participants as needed
		], {});
	},

	down: async (queryInterface, Sequelize) => {

		console.log('deleting participants')
		await queryInterface.bulkDelete('Participants', null, {});
		await queryInterface.bulkDelete('Sheets', null, {});

	}
};
