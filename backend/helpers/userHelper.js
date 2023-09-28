const axios = require("axios");
const {User} = require("../db/models");
// pool = require("../database");

// static
exports.getUserByEmail = (email) => {

    return User.findOne({
		where: {
			email: email
		}
	})
}

exports.getUsersPrimaryEmailFromGitHub = async (token) => {
    const email_response = await axios.get("https://api.github.com/user/public_emails", {
        headers: {
            "Authorization": `token ${token}`
        }
    })

    return email_response.data.filter((email) => email.primary === true)[0]
}

