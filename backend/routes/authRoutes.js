const axios = require("axios");
const express = require("express");
const router = express.Router();
pool = require("../database");
userHelper = require("../helpers/userHelper");

router.post('/getAccessToken', async (req, res) => {

    try {
        console.log('get access token running')

        if(!req.query?.code){
            res.status(200).send({ success: false, data: 'no code given' });
        }

        console.log('oauth code exists')

        const response = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.query.code,
        }, {
            headers: {
                accept: 'application/json',
            },
        })

        console.log('github oauth completed')
        const {access_token} = response.data;

        console.log({access_token})

        if(!access_token){
            res.status(200).send({ success: false, data: 'no access token given. code may have been invalid' });
        }else{
            res.cookie('session', access_token, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(200).send({ message: 'Access token cookie created' });
        }


    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        res.status(500).send({ message: 'Error fetching access token' });
    }
});

router.get('/getUserData', async (req, res) => {
    console.log('responding to getUserData')
    console.log(req.cookies)
    const token = req.cookies.session

    try{

        const email_response = await axios.get("https://api.github.com/user/public_emails", {
            headers: {
                "Authorization": `token ${token}`
            }
        })

        const primary_email = email_response.data.filter((email) => email.primary === true)[0]

        console.log({primary_email})

        const users = await userHelper.getUsersWithEmail(primary_email.email)
        let current_user = users[0] || {email: primary_email.email}
        res.status(200).json({success: true, data: {current_user}})

    }catch(error) {
        console.error(error.message)
        res.json({success: false, data: error})
    }

    //     if(!current_user){
    //             res.status(200).json({success: true, data: {}})
    //         }else{
    //
    //
    //             const new_user_data = {
    //                 name: user_response.data.name,
    //                 image: user_response.data.avatar_url,
    //                 email: primary_email.email
    //             }
    //
    //             current_user = await userHelper.createUser(new_user_data)
    //         }
    //
    //         res.status(200).json(current_user)
})

module.exports = router;