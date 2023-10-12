const userHelper = require("../helpers/userHelper");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.deleteSessionCookie = async (req, res) => {
	res.status(200)
		.cookie("oauth_access_token", "", {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		})
		.cookie("session_token", "", {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		})
		.json({ message: "Access token cookie removed" });
};

exports.getAccessToken = async (req, res) => {
	console.log("get access token reached");
	try {
		if (!req.query?.code) {
			console.error("no code given");
			res.status(401).send({ success: false, data: "no code given" });
		} else {
			const response = await axios.post(
				"https://github.com/login/oauth/access_token",
				{
					client_id: process.env.GITHUB_CLIENT_ID,
					client_secret: process.env.GITHUB_CLIENT_SECRET,
					code: req.query.code,
				},
				{
					headers: {
						accept: "application/json",
					},
				},
			);

			const { access_token } = response.data;

			if (!access_token) {
				console.error("no access token found");
				res.status(401).send({
					success: false,
					data: "no access token given. code may have been invalid",
				});
			} else {
				console.log("creating cookie and returning successful message");
				res.status(200)
					.cookie("oauth_access_token", access_token, {
						httpOnly: true,
						secure: true,
						sameSite: "none",
					})
					.json({ success: true, message: "Access token cookie created" });
			}
		}
	} catch (error) {
		console.error("There has been a problem with your fetch operation:", error);
		res.status(500).send({ message: "Error fetching access token" });
	}
};

exports.getUserData = async (req, res) => {
	const oauth_access_token = req.cookies.oauth_access_token;

	try {
		if (oauth_access_token) {
			const primary_email = await userHelper.getUsersPrimaryEmailFromGitHub(oauth_access_token);
			const user = await userHelper.getUserByEmail(primary_email.email);

			let current_user = {
				id: user?.id,
				name: user?.name,
				image: user?.image,
				email: primary_email.email,
			};

			const USER_ACCOUNT_EXISTS = user?.id;
			if (USER_ACCOUNT_EXISTS) {
				const session_token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
				res.cookie("session_token", session_token, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				});
			}

			res.status(200).json({ current_user });
		} else {
			res.status(400).json({ message: "no oauth cookie found in request" });
		}
	} catch (error) {
		console.error(error.message);
		res.json({ success: false, data: error });
	}
};
