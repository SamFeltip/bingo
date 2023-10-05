'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Participants', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			UserId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				},
				allowNull: false
			},
			SheetId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Sheets',
					key: 'id'
				},
				allowNull: false
			},
			isOwner: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
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

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Participants');
	}
};
