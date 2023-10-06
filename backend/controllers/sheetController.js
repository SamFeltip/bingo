const {Sheet, Participant, User, ParticipantSheetItem, SheetItem} = require("../db/models")
const jwt = require("jsonwebtoken");

exports.getSheetById = (req, res) => {
	const sheet_id = parseInt(req.params.sheet_id)

	const {session_token} = req.cookies
	const {user_id} = jwt.verify(session_token, process.env.JWT_SECRET)
	console.log(`user id: ${user_id}, sheet id: ${sheet_id}`)

	// sequelize.query(
	// 		'SELECT PSI.id, P."isOwner", PSI.position, SI.text, PSI.checked FROM "Sheets" INNER JOIN "Participants" P on "Sheets".id = P."SheetId" INNER JOIN "ParticipantSheetItems" PSI on P.id = PSI."ParticipantId" INNER JOIN "SheetItems" SI on SI.id = PSI."SheetItemId" WHERE "Sheets".id = :sheet_id AND P."UserId" = :user_id ORDER BY PSI.position;',
	// 		{
	// 			replacements: {
	// 				sheet_id: sheet_id,
	// 				user_id: user_id
	// 			},
	// 			type: QueryTypes.SELECT
	// 		}
	// 	)

	Sheet.findByPk(sheet_id, {
		attributes: ['name'],
		include: [
			{
				model: Participant,
				attributes: ['id', 'isOwner'],
				where: {
					UserId: user_id
				},
				include: [
					{
						model: ParticipantSheetItem,
						attributes: ['id', 'checked', 'position'],
						include: {
							model: SheetItem,
							attributes: ['text']
						}
					}
				],
			}
		],
		order: [[Participant, ParticipantSheetItem, 'position', 'ASC']]
	}).then(sheet => {
		res.status(200).json(sheet)
	}).catch(error => {
		console.error(error)
		res.json({error})
	})
}
;

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

exports.createSheet = async (req, res) => {

	const {session_token} = req.cookies
	const {user_id} = jwt.verify(session_token, process.env.JWT_SECRET)
	const {name, items} = req.body
	console.log({name, items})
	try {
		const new_sheet = await Sheet.create(
			{
				name
			}
		)

		await Participant.create({
			UserId: user_id,
			SheetId: new_sheet.id,
			isOwner: true
		})

		await SheetItem.bulkCreate(items.map(item => {
			return {
				SheetId: new_sheet.id,
				text: item.text
			}
		}))

		// will need to be done elsewhere
		// const participant_sheet_datas = sheet_items.map(sheet_item => {
		// 	return {
		// 		ParticipantId: owner_participant.id,
		// 		SheetItemId: sheet_item.id,
		// 		checked: false
		// 	}
		// })

		// await ParticipantSheetItem.bulkCreate(participant_sheet_datas)

		res.status(200).json(new_sheet)
	} catch (err) {
		console.error(err)
		res.status(500).send({ok: false, message: "could not create sheet"})
	}

}