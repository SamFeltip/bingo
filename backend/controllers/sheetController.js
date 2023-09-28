const {Sheet, User, Participant} = require("../db/models")

exports.getSheetById = (req, res) => {
	const id = parseInt(req.params.id)

	Sheet.findByPk(id, {
		include: [
			{
				model: Participant,
				attributes: ['id', 'isOwner'],
				include: {
					model: User
				}
			}
		]
	}).then(sheet => {
		res.status(200).json(sheet)
	}).catch(error => {
		res.status(401).json({error})
	})
};

exports.getSheets = (req, res) => {

	if (!req.current_user) {
		res.status(401).json({error: 'cannot find authenticated user'})
	}

	Sheet.findAll({
		include: {
			model: Participant,
			attributes: ["isOwner", "id"],
			include: {
				model: User
			}
		}
	}).then(sheets => {
		res.json(sheets)
	}).catch(err => {
		console.log(err)
		res.status(400).json({error: 'cannot retrieve sheets'})
	})


};
