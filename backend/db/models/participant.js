'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Participant extends Model {
		static associate(models) {
			Participant.belongsTo(models.User);
			Participant.belongsTo(models.Sheet);

			Participant.hasMany(models.ParticipantSheetItem);
		}
	}

	Participant.init({
		isOwner: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Participant',
	});
	return Participant;
};