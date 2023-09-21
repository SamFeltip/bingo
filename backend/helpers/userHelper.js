const jwt = require('jsonwebtoken');
pool = require("../database");

// static
exports.getUsersWithEmail = (email) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
                reject(error)
            }else{
                resolve(results.rows)
            }
        })
    })
}
