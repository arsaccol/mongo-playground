const express = require('express');
const users_router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authorization');
const url = require('url');

const User = require('../models/user_model');

users_router.post('/login', async (req, res) => {
    // Assuming the express app uses the json middleware, I guess?
    // Perhaps it shouldn't matter all that much
    
    console.log(req.body);

    const {email, password} = req.body;
    console.log(req.body);
    
    try {
        const authenticated_user = await User.findByCredentials(email, password);
        

        //const token = jwt.sign({username: authenticated_user.username, signin_time: Date.now()}, process.env.JWT_KEY, {expiresIn: "1 hour"});
        const token = await authenticated_user.generateAuthToken();
        res.status(200).json({ token: token, user: { 
            id: authenticated_user.id,
            email: authenticated_user.email,
            username: authenticated_user.email
        }});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Login error',
            error: err
        });
    }
});


users_router.put('/:username', auth, (req, res) => {



});


users_router.get('/id/:userid', auth, async (req, res) => {
    const payload = req.token_payload;
    const userid = req.params.userid;
    const uri = req.originalUrl;
    
    try {
        const user_safe = await User.findByIdWithoutPassword(userid);
        user_safe.uri = uri
        res.status(200).json(user_safe);
    }
    catch(err) {
        res.status(404).json({
            status: 'Not found',
            uri: uri,
            message: 'Could not find user'
        })

    }
});

users_router.post('/signup', async (req, res) => {
    console.log('buga');
    
    
    try {
        const user = new User(req.body);
        
        const public_user = {_id, email, username, name} = user;
        

        await user.save();

        res.status(201).json({
            status: 'Created',
            user: public_user
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            error: err
        });
    }
    



});


module.exports = users_router;