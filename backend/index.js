const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const axios = require('axios')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

const app = express()

app.use(cors())
app.use(bodyParser.json())

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.get('/getAccessToken', async (req, res) => {

    console.log(req.query.code);
    const params = "?client_id=" + process.env.GITHUB_CLIENT_ID + "&client_secret=" + process.env.GITHUB_CLIENT_SECRET + "&code=" + req.query.code;

    await axios("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {

        if(response.data.error){
            throw Error(response.data.error)
        }

        console.log(response.data)
        res.json(response.data)


    }).catch(error => {
        console.log(error.message)

        res.json({error: "an error occurred"})
    })
})

app.get('/getUserData', async (req, res) => {

    await axios("https://api.github.com/user", {
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

app.get('/', (req, res) => {
    res.send('this is the backend for bingo');
})

// Declare the redirect route
app.get('/home', (req, res) => {

	// The req.query object has the query params that were sent to this route.
	const requestToken = req.query.code

	axios({
		method: 'post',
		url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${requestToken}`,
		// Set the content type header, so that we get the response in JSON
		headers: {
			accept: 'application/json'
		}

	}).then((response) => {
		const accessToken = response.data.access_token
		console.log(response.data)
	})
})

const port = process.env.PORT || '4040';
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// redirect the user to the home page, along with the access token