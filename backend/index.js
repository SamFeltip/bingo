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

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes)

const port = process.env.PORT || '4000';
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// redirect the user to the home page, along with the access token