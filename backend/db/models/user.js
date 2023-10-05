'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.belongsToMany(models.Sheet, { through: models.Participant });
			User.hasMany(models.Participant);
		}
	}

	User.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		image: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};