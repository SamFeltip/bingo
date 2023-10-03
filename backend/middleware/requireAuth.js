const jwt = require("jsonwebtoken");
const {User} = require("../db/models");

const requireAuth = async (req, res, next) => {

	const {session_token} = req.cookies

	if (!session_token) {
		console.log('no session token')
		return res.status(401).json({error: "no session_token given"})
	}

	try {
		const {user_id} = jwt.verify(session_token, process.env.JWT_SECRET)

		req.current_user = await User.findByPk(user_id, null)
		console.log('authenticated successfully')
		next()

	} catch (err) {
		console.error(err)
		return res.status(401).json({error: 'Request is not authorized'})
	}

}

module.exports = requireAuth