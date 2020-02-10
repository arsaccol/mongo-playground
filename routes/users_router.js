const express = require('express');
const users_router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user_model');

users_router.post('/login', async (req, res) => {
    // Assuming the express app uses the json middleware, I guess?
    // Perhaps it shouldn't matter all that much
    const {email, password} = req.body;
    
    try {
        const authenticated_user = await User.findByCredentials(email, password);
        

        //const token = jwt.sign({username: authenticated_user.username, signin_time: Date.now()}, process.env.JWT_KEY, {expiresIn: "1 hour"});
        const token = await authenticated_user.generateAuthToken();
        res.status(200).json({ token: token, user: { 
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

users_router.post('/signup', async (req, res) => {
    console.log('buga');
    
    const {email, password} = req.body;
    
    try {
        const user = new User(req.body);
        await user.save();

        res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            error: err
        });
    }
    



});


module.exports = users_router;