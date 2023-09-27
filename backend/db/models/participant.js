'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Participant extends Model {
		static associate(models) {
			Participant.belongsTo(models.Sheet, {foreignKey: 'sheetId'});
			Participant.belongsTo(models.User, {foreignKey: 'userId'});
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
