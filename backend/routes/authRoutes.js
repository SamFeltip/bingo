const axios = require("axios");
const express = require("express");
const router = express.Router();
const userHelper = require("../helpers/userHelper");

router.get('/', (req, res) => {
    res.send('auth root')
})

router.post('/getAccessToken', async (req, res) => {

    try {

        if(!req.query?.code){
            res.status(200).send({ success: false, data: 'no code given' });
        }

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

        if(!access_token){
            res.status(200).send({ success: false, data: 'no access token given. code may have been invalid' });
        }else{
            res
                .status(200)
                .cookie('oauth_access_token', access_token, { httpOnly: true, secure: true, sameSite: 'none' })
                .json({ message: 'Access token cookie created' });
        }


    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        res.status(500).send({ message: 'Error fetching access token' });
    }
});



router.get('/getUserData', async (req, res) => {
    const oauth_access_token = req.cookies.oauth_access_token

    try{
        if(oauth_access_token){
            const primary_email = await userHelper.getUsersPrimaryEmailFromGitHub(oauth_access_token)
            const user = await userHelper.getUserByEmail(primary_email.email)

            let current_user = {
                id: user?.id,
                name: user?.name,
                image: user?.image,
                email: primary_email.email
            }

            const USER_ACCOUNT_EXISTS = user?.id
            if (USER_ACCOUNT_EXISTS){
                const session_token = userHelper.createToken(user.id)
                res.cookie('session', session_token, { httpOnly: true, secure: true, sameSite: 'none' });
            }

            res.status(200).json({success: true, data: {current_user}})
        }else{
            res.status(400).json({success: false, data: {message: 'no oauth cookie found in request'}})
        }


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