'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.belongsToMany(models.Sheet, { through: 'Participants', as: 'sheets' });

			// Only owned sheets
			User.belongsToMany(models.Sheet, {
				through: {
					model: 'Participants',
					scope: { is_owner: true }
				},
				as: 'ownedSheets'
			});
		}
	}

	User.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		image: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};