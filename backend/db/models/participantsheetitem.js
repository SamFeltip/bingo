'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class ParticipantSheetItem extends Model {
		static associate(models) {
			// ParticipantSheetItem.belongsTo(models.Participant);
			ParticipantSheetItem.belongsTo(models.SheetItem);

			ParticipantSheetItem.belongsTo(models.Participant, { foreignKey: 'ParticipantId' });



		}
	}

	ParticipantSheetItem.init({
		checked: DataTypes.BOOLEAN,
		position: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'ParticipantSheetItem',
	});
	return ParticipantSheetItem;
};