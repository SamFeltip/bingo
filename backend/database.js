const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: 'localhost',
    database: 'bingo',
    port: process.env.DATABASE_PORT
})

module.exports = pool