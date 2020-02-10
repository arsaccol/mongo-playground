const jwt = require('jsonwebtoken');
const express = require('express')

async function checkAuthorization(req, res, next) {
    try {
        const token = req.body.token;
        if(await jwt.verify(token, process.env.JWT_KEY)) {
            next();
        }
        else {
            res.status(401).json({
                status: 'Unauthorized'
            });
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Server error'
        });
    }
}

module.exports = checkAuthorization;