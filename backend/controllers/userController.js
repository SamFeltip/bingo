
const axios = require("axios");
const {User, Participant} = require("../db/models")
const jwt = require("jsonwebtoken");


exports.getUser = (req, res) => {
    res.send('GET request to the user page!');
};

exports.getUsers = (req, res) => {

	const sheet_id = req.query?.sheet_id

	let where_condition = true
	if(sheet_id){
		where_condition = {SheetId: sheet_id}
	}

	User.findAll({
		attributes: ["image", "name", "id"],
		include: {
			model: Participant,
			attributes: ["isOwner"],
			where: where_condition,
			required: false
		}
	}).then(users => {
		res.json(users)
	}).catch((err) => {
		throw err;
	})
}

exports.getUserById = (request, response) => {
    const id = parseInt(request.params.id)

	User.findByPk(id)
		.then(user => {
			response.status(200).json(user)
		})
		.catch(error => {
			throw error
		});
}

exports.createUser = async (req, res) => {

    try{

		console.log('creating user...')

        const { email } = req.body
        const token = req.cookies.oauth_access_token

        const user_response = await axios.get("https://api.github.com/user", {
            headers: {
                "Authorization": `token ${token}`
            }
        })

        const {name, avatar_url} = user_response.data

		User.create({
			name: name,
			email: email,
			image: avatar_url
		}).then(user => {

			console.log('created user!')
			console.log(user.dataValues)

			const {id} = user.dataValues
			//     create JWT for authentication between client and server
			const session_token = jwt.sign({user_id: id}, process.env.JWT_SECRET, {expiresIn: '1d'})
			res.cookie('session_token', session_token, { httpOnly: true, secure: true, sameSite: 'none' });

			res.status(200).json({new_user: {id, name, image: avatar_url, email}})
		}).catch((err) => {
			throw err
		})

    }catch(err){
        console.error(err)
        res.status(400).send(err.message)
    }

}
