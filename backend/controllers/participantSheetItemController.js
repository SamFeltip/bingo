const jwt = require("jsonwebtoken");
const {SheetItem, ParticipantSheetItem, Participant} = require("../db/models")

exports.createNewPSI = async (req, res) => {
	const participant_id = parseInt(req.params.participant_id)

	const {session_token} = req.cookies
	const {user_id} = jwt.verify(session_token, process.env.JWT_SECRET)

	const psi = await ParticipantSheetItem.findOne({
		where: {ParticipantId: participant_id}
	})

	const participant = await Participant.findByPk(participant_id)

	const PARTICIPANT_SHEET_ITEM_ALREADY_EXISTS = !!psi
	const USER_NOT_AUTHENTICATED_AS_GIVEN_PARTICIPANT = user_id !== participant.UserId

	switch(true){
		case USER_NOT_AUTHENTICATED_AS_GIVEN_PARTICIPANT:
			res.status(401).json({ok: false, message: 'users cannot create sheets for other users'})
			break

		case PARTICIPANT_SHEET_ITEM_ALREADY_EXISTS:
			res.status(403).json({ok: false, message: 'participant sheet already exists'})
			break

		default:
			SheetItem.findAll({
				attributes: ["id"],
				where: {
					SheetId: participant.SheetId
				}
			}).then(sheet_items => {
				let participant_sheet_items = []
				try {
					sheet_items.dataValues.map(async sheet_item => {

						let participant_sheet_item = await ParticipantSheetItem.create({
							SheetItemId: sheet_item.id,
							ParticipantId: participant_id,
							position: Math.floor(Math.random() * sheet_items.length),
							isChecked: false
						})

						participant_sheet_items.push(participant_sheet_item)
					})
					res.status(200).json({ok: true, ParticipantSheetItems: participant_sheet_items})

				} catch (err) {
					res.status(501).json({ok: false, message: 'could not create participant sheet items'})

				}


			}).catch(err => {
				console.error(err)
				res.status(501).json({ok: false, message: 'could not find sheet items'})

			})
			break
	}
}

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
