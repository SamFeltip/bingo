const axios = require("axios");
const userHelper = require("../helpers/userHelper");
const {Sheet, User, Participant} = require("../db/models")

exports.getSheetById = (req, res) => {
	const id = parseInt(req.params.id)

	Sheet.findByPk(id, {
		include: [
			{
				model: User,
				as: 'participants',
				required: true,
				attributes: ['name'],
			},
			{
				model: User,
				as: 'owner',
				attributes: ['name']
			}
		]
	}).then(sheet => {
		res.status(200).json(sheet)
	}).catch(err => {
		throw err
	})
};
exports.createSheet = (req, res) => {

};
exports.getSheets = (req, res) => {

};
