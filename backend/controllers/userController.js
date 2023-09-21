const axios = require("axios");
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

        const token = req.cookies.session

        if(token){
            console.log({token})
        }

        const user_response = await axios.get("https://api.github.com/user", {
            headers: {
                "Authorization": `token ${token}`
            }
        })

        const {name, avatar_url} = user_response.data

        console.log({name})

        pool.query('INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING *', [name, email, avatar_url], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json({new_user: results.rows[0]})
        })
    }catch(err){
        console.error(err)
        res.status(400).send(err.message)
    }

}
