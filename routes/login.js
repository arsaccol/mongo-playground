const express = require('express');
const login_router = express.Router();

const mongoose = require('mongoose');

const User = require('../models/user');

const url = require('url');
const db_url = url.resolve(process.env.MONGODB_PATH, process.env.DB_NAME);

login_router.get('/', (req, res) => {
    res.send('login stuff');
});

// Expected route: /api/login
login_router.post('/', async (req, res) => {
    const {email, password} = req.body;
    
    mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', async () => {
        const credentials = {
            email: email,
            password: password
        };
        
        try {
            const authenticated_user = await User.findByCredentials(email, password);
            res.json(authenticated_user);
        }
        catch(err) {
            res.status(500).json({
                message: 'Login error',
                error: err
            });
        }

    });
});

module.exports = login_router;
