

const express = require('express')

const cors = require('cors')


// Import the axios library, to make HTTP requests
const axios = require('axios')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/getAccessToken', async (req, res) => {

    console.log(req.query.code);

    const params = "?client_id=" + process.env.GITHUB_CLIENT_ID + "&client_secret=" + process.env.GITHUB_CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        res.json(data)
    })
})

app.get('/getUserData', async (req, res) => {

    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        res.json(data)
    })
})

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET
const port = process.env.PORT || '4040';

app.get('/', (req, res) => {
    res.send('this is the backend for bingo');
})

// Declare the redirect route
app.get('/home', (req, res) => {

	// The req.query object has the query params that were sent to this route.
	const requestToken = req.query.code

	axios({
		method: 'post',
		url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
		// Set the content type header, so that we get the response in JSON
		headers: {
			accept: 'application/json'
		}

	}).then((response) => {

		const accessToken = response.data.access_token
		console.log(response.data)
	})
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

console.log('run!')
// redirect the user to the home page, along with the access token