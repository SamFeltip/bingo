const axios = require("axios");
const userHelper = require("../helpers/userHelper");
pool = require("../database");

exports.getUser = (req, res) => {
    res.send('GET request to the user page!');
};

exports.getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

exports.getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(results.rows[0])
    })
}

exports.createUser = async (req, res) => {
    try{
        const { email } = req.body

        const token = req.cookies.oauth_access_token

        const user_response = await axios.get("https://api.github.com/user", {
            headers: {
                "Authorization": `token ${token}`
            }
        })

        const {name, avatar_url} = user_response.data

        pool.query('INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING *', [name, email, avatar_url], (error, results) => {
            if (error) {
                throw error
            }

            const {id} = results.rows[0]

            //     create JWT for authentication between client and server
            const session_token = userHelper.createToken(id)
            res.cookie('session', session_token, { httpOnly: true, secure: true, sameSite: 'none' });

            res.status(200).json({new_user: {id, name, image: avatar_url, email}})
        })
    }catch(err){
        console.error(err)
        res.status(400).send(err.message)
    }

}
