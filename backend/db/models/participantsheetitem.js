'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ParticipantSheetItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			ParticipantSheetItem.belongsTo(models.Participant);
			ParticipantSheetItem.belongsTo(models.SheetItem);
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