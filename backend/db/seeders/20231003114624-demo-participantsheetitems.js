'use strict';

const {SheetItem, Participant, Sheet} = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

		// not sure why id needs to be specified here
		const participant_objs = await Participant.findAll({attributes: ['id']});
		const participants = participant_objs.map(participant_obj => participant_obj.dataValues)

		const sheet_obj = await Sheet.findOne({where: {name: 'Friday Night Bingo'}})
		const friday_night_bingo_sheet = sheet_obj.dataValues

		const fnb_sheet_item_objs = await SheetItem.findAll({where: {SheetId: friday_night_bingo_sheet.id}})
		const fnb_sheet_items = fnb_sheet_item_objs.map(fnb_sheet_item_obj => fnb_sheet_item_obj.dataValues)

		// random order for the sheet items
		const participant_sheet_item_indexes = [
			[12, 7, 20, 2, 15, 23, 1, 8, 4, 18, 11, 5, 22, 9, 3, 24, 14, 10, 21, 0, 19, 6, 16, 13, 17], //participant 0
			[3, 15, 8, 21, 14, 0, 19, 24, 10, 6, 1, 18, 20, 7, 23, 4, 9, 13, 22, 2, 11, 5, 17, 12, 16], //participant 1
			[18, 7, 4, 13, 21, 2, 15, 24, 8, 0, 20, 9, 14, 23, 1, 10, 5, 22, 3, 19, 6, 16, 11, 12, 17], //participant 2
		]

		let participant_sheet_items = []

		for (let participant_index = 0; participant_index < 3; participant_index++) {
			console.log(`participant ${participant_index}: ${participants[participant_index].id}`)

			for (let sheet_item_index = 0; sheet_item_index < 25; sheet_item_index++) {

				participant_sheet_items.push({
					SheetItemId: fnb_sheet_items[sheet_item_index].id,
					ParticipantId: participants[participant_index].id,
					checked: false,
					position: participant_sheet_item_indexes[participant_index][sheet_item_index], //random position
					createdAt: new Date(),
					updatedAt: new Date()
				})
			}

		}

		// Add demo sheetItems
		await queryInterface.bulkInsert('ParticipantSheetItems', participant_sheet_items)
	},
	down: async (queryInterface, Sequelize) => {

		console.log('deleting participant sheet items')
		await queryInterface.bulkDelete('ParticipantSheetItems', null, {});

	}
};
