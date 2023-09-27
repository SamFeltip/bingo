'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Sheets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
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

		await queryInterface.createTable('Participants', {
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				},
				allowNull: false
			},
			sheetId: {
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
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Participants');
		await queryInterface.dropTable('Sheets');
	}
};
