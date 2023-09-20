const express = require('express')
const cors = require('cors')
const axios = require('axios')
const cookieParser = require('cookie-parser');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,  // Allow CORS from your client's origin
    credentials: true  // Allow cookies to be included in requests
}));


const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.post('/getAccessToken', async (req, res) => {
    try {
        console.log('get access token running')
        const response = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.query.code,
        }, {
            headers: {
                accept: 'application/json',
            },
        })

        const {access_token} = response.data;
        console.log({access_token})

        res.cookie('session', access_token, { httpOnly: true, secure: true, sameSite: 'none' });
        res.status(200).send({ message: 'Access token cookie created' });

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        res.status(500).send({ message: 'Error fetching access token' });
    }
});

app.get('/getUserData', async (req, res) => {
    console.log('responding to getUserData')
    console.log(req.cookies)
    const token = req.cookies.session

    await axios("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": `token ${token}`
        }
    }).then((response) => {
        console.log(response.data)
        res.json({success: true, data: response.data})
    }).catch((error) => {
        console.error(error.message)
        res.json({success: false, data: error})
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

const port = process.env.PORT || '4000';
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// redirect the user to the home page, along with the access token