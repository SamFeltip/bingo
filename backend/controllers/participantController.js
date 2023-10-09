const jwt = require("jsonwebtoken");
const {Participant} = require("../db/models");

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

	if (INVALID_CREDENTIALS) {
		// res.status(401).json({ok: false, message: 'user cannot invite unless they own a sheet', new_participant: null})
		return {message: 'user cannot invite unless they own a sheet'}
	} else if (existing_participant) {
		// res.status(501).json({ok: false, message: 'user is already participating', new_participant: null})
		return {message: 'user is already participating'}

	} else {
		return {message: 'user is not participating'}
	}
}

exports.createParticipant = async (req, res) => {
	const {inviting_user_id, sheet_id} = req.body
	const {session_token} = req.cookies

	const {message} = await user_permitted(inviting_user_id, sheet_id, session_token)

	if (message === 'user cannot invite unless they own a sheet') {
		res.status(401).json({ok: false, message, new_participant: null})

	} else if (message === 'user is already participating') {
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

	if (message === 'user cannot invite unless they own a sheet') {
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