const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

// for https
const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,  // Allow CORS from your client's origin
    credentials: true  // Allow cookies to be included in requests
}));


app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('backend!');
});

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes)

const port = process.env.PORT || '4000';

const server = https.createServer({key: key, cert: cert }, app);

server.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
// redirect the user to the home page, along with the access token