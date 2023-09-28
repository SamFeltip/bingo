const userHelper = require("../helpers/userHelper");
const jwt = require("jsonwebtoken");
const axios = require("axios");


exports.getAccessToken = async (req, res) => {

	try {

		if(!req.query?.code){
			res.status(200).send({ success: false, data: 'no code given' });
		}

		const response = await axios.post("https://github.com/login/oauth/access_token", {
			client_id: process.env.GITHUB_CLIENT_ID,
			client_secret: process.env.GITHUB_CLIENT_SECRET,
			code: req.query.code,
		}, {
			headers: {
				accept: 'application/json',
			},
		})

		const {access_token} = response.data;

		if(!access_token){
			res.status(200).send({ success: false, data: 'no access token given. code may have been invalid' });
		}else{
			res
				.status(200)
				.cookie('oauth_access_token', access_token, { httpOnly: true, secure: true, sameSite: 'none' })
				.json({ message: 'Access token cookie created' });
		}


	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
		res.status(500).send({ message: 'Error fetching access token' });
	}
}



exports.getUserData = async (req, res) => {
	const oauth_access_token = req.cookies.oauth_access_token

	try{
		if(oauth_access_token){
			const primary_email = await userHelper.getUsersPrimaryEmailFromGitHub(oauth_access_token)
			const user = await userHelper.getUserByEmail(primary_email.email)

			let current_user = {
				id: user?.id,
				name: user?.name,
				image: user?.image,
				email: primary_email.email
			}

			const USER_ACCOUNT_EXISTS = user?.id
			if (USER_ACCOUNT_EXISTS){
				const session_token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})
				res.cookie('session_token', session_token, { httpOnly: true, secure: true, sameSite: 'none' });
			}

			res.status(200).json({success: true, data: {current_user}})
		}else{
			res.status(400).json({success: false, data: {message: 'no oauth cookie found in request'}})
		}


	}catch(error) {
		console.error(error.message)
		res.json({success: false, data: error})
	}
}