const axios = require("axios");
const db = require("../db/models")
const jwt = require("jsonwebtoken");


exports.getUser = (req, res) => {
    res.send('GET request to the user page!');
};

exports.getUsers = (request, response) => {

	db.User.findAll().then(users => {
		response.json(users)
	}).catch((err) => {
		throw err;
	})
}

exports.getUserById = (request, response) => {
    const id = parseInt(request.params.id)

	db.User.findByPk(id)
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

		db.User.create({
			name: name,
			email: email,
			image: avatar_url
		}).then(user => {

			console.log('created user!')
			console.log(user.dataValues)

			const {id} = user.dataValues

			//     create JWT for authentication between client and server
			const session_token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
			res.cookie('session', session_token, { httpOnly: true, secure: true, sameSite: 'none' });

			res.status(200).json({new_user: {id, name, image: avatar_url, email}})
		}).catch((err) => {
			throw err
		})

    }catch(err){
        console.error(err)
        res.status(400).send(err.message)
    }

}
