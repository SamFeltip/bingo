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

exports.createUser = (request, response) => {
    const { name, email, image } = request.body

    pool.query('INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING *', [name, email, image], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}