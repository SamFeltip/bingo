const jwt = require("jsonwebtoken");
const {sequelize, ParticipantSheetItem} = require("../db/models")
const {QueryTypes} = require("sequelize");


exports.toggleCheckedPSI = async (req, res) => {

	const psi_id = parseInt(req.params.psi_id)

	const {session_token} = req.cookies
	const {user_id} = jwt.verify(session_token, process.env.JWT_SECRET)

	try {
		const psis = await sequelize.query(
			'SELECT "ParticipantSheetItems".id, "ParticipantSheetItems".checked FROM "ParticipantSheetItems" INNER JOIN "Participants" P on P.id = "ParticipantSheetItems"."ParticipantId" WHERE P."UserId" = :user_id AND "ParticipantSheetItems".id = :psi_id;',
			{
				replacements: {
					psi_id: psi_id,
					user_id: user_id
				},
				type: QueryTypes.SELECT
			}
		)

		await ParticipantSheetItem.update(
			{checked: !psis[0].checked},
			{where: {id: psis[0].id}}
		)

		res.json({ok: true})

	} catch (error) {
		console.error(error)
		res.json({success: false, error: error})
	}
};
