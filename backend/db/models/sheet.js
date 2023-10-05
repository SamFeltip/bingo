'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Sheet extends Model {
		static associate(models) {
			Sheet.belongsToMany(models.User, { through: models.Participant });
			Sheet.hasMany(models.Participant);
			Sheet.hasMany(models.SheetItem);
		}
	}
	Sheet.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'Sheet',
	});
	return Sheet;
};