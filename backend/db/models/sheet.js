'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Sheet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {

			Sheet.belongsToMany(models.User, { through: models.Participant });
			Sheet.hasMany(models.Participant);

			// Sheet.belongsToMany(models.User, {
			// 	through: {
			// 		model: 'Participants',
			// 		scope: { isOwner: true }
			// 	},
			// 	as: 'owner'
			// });

			// Sheet.hasMany(models.Participant, {})
		}


	}

	Sheet.init({
		name: DataTypes.STRING,
		//   has many users. sheet and users many-to-many. via participants table
	}, {
		sequelize,
		modelName: 'Sheet',
	});
	return Sheet;
};