'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Participant extends Model {
		static associate(models) {

			Participant.belongsTo(models.Sheet);
			Participant.belongsTo(models.User);
		}
	}

	Participant.init({
		userId: DataTypes.INTEGER,
		sheetId: DataTypes.INTEGER,
		is_owner: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Participant',
	});

	return Participant;
};
