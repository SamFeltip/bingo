'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class SheetItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			SheetItem.belongsTo(models.Sheet);
			SheetItem.hasMany(models.ParticipantSheetItem);
		}
	}

	SheetItem.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		text: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'SheetItem',
	});
	return SheetItem;
};