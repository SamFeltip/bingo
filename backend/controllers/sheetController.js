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

exports.getSheets = (req, res) => {

	if (!req.current_user) {
		res.status(401).json({error: 'cannot find authenticated user'})
	}

	Sheet.findAll({
		include: [{
			model: Participant,
			where: {
				UserId: req.current_user.id
			},
			attributes: ["isOwner", "UserId"]
		},
		{
			model: User
		}]
	}).then(sheets => {
		res.json(sheets)
	}).catch(err => {
		console.log(err)
		res.status(400).json({error: 'cannot retrieve sheets'})
	})


};
