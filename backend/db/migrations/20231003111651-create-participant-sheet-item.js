'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ParticipantSheetItems', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			checked: {
				type: Sequelize.BOOLEAN
			},
			position: {
				type: Sequelize.INTEGER
			},
			SheetItemId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'SheetItems',
					key: 'id'
				},
				allowNull: false
			},
			ParticipantId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Participants',
					key: 'id'
				},
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('ParticipantSheetItems');
	}
};