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
login_router.post('/', (req, res) => {

});

module.exports = login_router;