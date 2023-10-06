'use strict';

const {SheetItem, Participant, Sheet, ParticipantSheetItem} = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

		// not sure why id needs to be specified here
		// const participants = await Participant.findAll({attributes: ['id']});
		const participants = await Participant.findAll();
		console.log(participants[0])

		const sunday_funday_bingo = await Sheet.findOne({where: {name: 'Sunday Funday Bingo'}})
		const fnb_sheet_items = await SheetItem.findAll({where: {SheetId: sunday_funday_bingo.id}})

		// random order for the sheet items
		const participant_sheet_item_indexes = [
			[12, 7, 20, 2, 15, 23, 1, 8, 4, 18, 11, 5, 22, 9, 3, 24, 14, 10, 21, 0, 19, 6, 16, 13, 17], //participant 0
			[3, 15, 8, 21, 14, 0, 19, 24, 10, 6, 1, 18, 20, 7, 23, 4, 9, 13, 22, 2, 11, 5, 17, 12, 16], //participant 1
			[18, 7, 4, 13, 21, 2, 15, 24, 8, 0, 20, 9, 14, 23, 1, 10, 5, 22, 3, 19, 6, 16, 11, 12, 17], //participant 2
		]

		for (let participant_index = 0; participant_index < 3; participant_index++) {
			console.log(`participant ${participant_index}: ${participants[participant_index].id}`)

			for (let sheet_item_index = 0; sheet_item_index < 25; sheet_item_index++) {

				await ParticipantSheetItem.create({
					checked: false,
					position: participant_sheet_item_indexes[participant_index][sheet_item_index], //random position
					createdAt: new Date(),
					updatedAt: new Date(),
					SheetItemId: fnb_sheet_items[sheet_item_index].id,
					ParticipantId: participants[participant_index].id
				})
			}
		}
	},
	down: async (queryInterface, Sequelize) => {

		console.log('deleting participant sheet items')
		await queryInterface.bulkDelete('ParticipantSheetItems', null, {});

	}
};
