const jwt = require("jsonwebtoken");
const {Participant, ParticipantSheetItem} = require("../db/models");

const INVALID_CREDENTIALS_MESSAGE = 'user cannot invite unless they own a sheet'
const INVITING_USER_IS_PARTICIPANT_MESSAGE = 'user is already participating'
const USER_NOT_PARTICIPANT_MESSAGE = 'user is not participating'

const user_permitted = async (inviting_user_id, sheet_id, session_token) => {
	const {user_id: current_user_id} = jwt.verify(session_token, process.env.JWT_SECRET)

	const current_user_participant = await Participant.findOne({
		where: {
			SheetId: sheet_id,
			UserId: current_user_id,
		},
		attributes: ['isOwner']
	})

	const existing_participant = await Participant.findOne({
		where: {
			SheetId: sheet_id,
			UserId: inviting_user_id
		}
	})

	const INVALID_CREDENTIALS = !current_user_participant || !current_user_participant.isOwner
	const INVITING_USER_IS_PARTICIPANT = !!existing_participant

	if (INVALID_CREDENTIALS) {return {message: INVALID_CREDENTIALS_MESSAGE}}
	if (INVITING_USER_IS_PARTICIPANT) {return {message: INVITING_USER_IS_PARTICIPANT_MESSAGE}}

	return {message: USER_NOT_PARTICIPANT_MESSAGE}
}

exports.createParticipant = async (req, res) => {
	const {inviting_user_id, sheet_id} = req.body
	const {session_token} = req.cookies

	const {message} = await user_permitted(inviting_user_id, sheet_id, session_token)

	if (message === INVALID_CREDENTIALS_MESSAGE) {
		res.status(401).json({ok: false, message, new_participant: null})

	} else if (message === INVITING_USER_IS_PARTICIPANT_MESSAGE) {
		res.status(501).json({ok: false, message, new_participant: null})

	} else {
		Participant.create({
			SheetId: sheet_id,
			UserId: inviting_user_id,
			isOwner: false
		}).then(new_participant => {
			res.status(200).json({ok: true, message: 'successfully created new participant', new_participant})
		}).catch(error => {
			console.error(error)
			res.status(500).json({ok: false, message: 'unable to create new participant', new_participant: null})
		})
	}


}

exports.deleteParticipant = async (req, res) => {
	const {inviting_user_id, sheet_id} = req.body
	const {session_token} = req.cookies
	const {message} = await user_permitted(inviting_user_id, sheet_id, session_token)

	if (message === INVALID_CREDENTIALS_MESSAGE) {
		res.status(401).json({ok: false, message})

	} else if (message === 'user is not participating') {
		res.status(500).json({ok: false, message})

	} else {
		Participant.destroy({
			where: {
				UserId: inviting_user_id,
				SheetId: sheet_id,
				isOwner: false
			}
		}).then(rows_deleted => {
			if(rows_deleted === 0){
				res.status(500).json({ok: false, error: 'could not find participant to permitted to be removed. Participant may be owner'})
			}else{
				res.status(200).json({ok: true, message: 'successfully removed participant'})
			}

		}).catch(error => {
			console.error(error)
			res.status(500).json({ok: false, message: 'unable to delete participant'})

		})
	}
}

exports.getParticipant = async (req, res) => {

	const {user_id, sheet_id} = req.query

	const {session_token} = req.cookies

	console.log(user_id, sheet_id)

	const {message} = await user_permitted(user_id, sheet_id, session_token)

	if(message === INVITING_USER_IS_PARTICIPANT_MESSAGE){
		Participant.findOne({
			where: {
				UserId: user_id,
				SheetId: sheet_id
			},
			include: [{
				model: ParticipantSheetItem,
				attributes: ['checked', 'position']
			}],
			order: [[ParticipantSheetItem, 'position', 'ASC']]
		}).then(participant => {
			res.status(200).json({ok: true, participant})
		})
	}else{
		res.status(401).json({ok: false, message})
	}

	// res.status(501).send('not yet')
}