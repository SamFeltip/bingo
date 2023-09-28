const jwt = require("jsonwebtoken");
const {User} = require("../db/models");

const requireAuth = async (req, res, next) => {

	const {session} = req.cookies
	console.log(session)

	if (!session) {
		return res.status(401).json({error: "no session given"})
	}

	try {
		const {id} = jwt.verify(session, process.env.JWT_SECRET)

		req.current_user = await User.findByPk(id, null)
		console.log('completed')
		next()

	} catch (err) {
		console.error(err)
		return res.status(401).json({error: 'Request is not authorized'})
	}

}

module.exports = requireAuth