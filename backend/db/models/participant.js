"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Participant extends Model {
		static associate(models) {
			Participant.belongsTo(models.User);
			Participant.belongsTo(models.Sheet);
			Participant.hasMany(models.ParticipantSheetItem);
		}
	}

	Participant.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			isOwner: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Participant",
		},
	);
	return Participant;
};
