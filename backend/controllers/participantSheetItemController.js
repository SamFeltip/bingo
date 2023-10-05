const jwt = require("jsonwebtoken");
const {sequelize, ParticipantSheetItem, Participant} = require("../db/models")
const {QueryTypes} = require("sequelize");


exports.toggleCheckedPSI = async (req, res) => {

	const psi_id = parseInt(req.params.psi_id)

	const {session_token} = req.cookies
	const {user_id} = jwt.verify(session_token, process.env.JWT_SECRET)

	try {

		const psi = await ParticipantSheetItem.findOne({
			where: {id: psi_id},
			attributes: ["id", "checked"],
			include: {
				model: Participant,
				attributes: ["UserId"],
				where: {
					UserId: user_id
				}
			}
		})

		await ParticipantSheetItem.update(
			{checked: !psi.checked},
			{where: {id: psi.id}}
		)

		res.json({ok: true})

	} catch (error) {
		console.error(error)
		res.json({success: false, error: error})
	}
};
