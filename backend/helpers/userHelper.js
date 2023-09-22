const jwt = require('jsonwebtoken');
const axios = require("axios");
pool = require("../database");

// static
exports.getUserByEmail = (email) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
                reject(error)
            }else{
                resolve(results.rows[0])
            }
        })
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


exports.createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

