const jwt = require('jsonwebtoken');
const express = require('express')

async function checkAuthorization(req, res, next) {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        try {
            //const token = req.body.token;
            
            const token = req.headers.authorization.split(' ')[1];

            if(await jwt.verify(token, process.env.JWT_KEY)) {
                console.log(`Token verified for payload ${JSON.stringify(jwt.decode(token))}`);
                req.token_payload = jwt.decode(token);
                next();
            }
            else {
                console.log(`Token NOT verified for payload ${JSON.stringify(jwt.decode(token))}`);

                res.status(401).json({
                    status: 'Could not verify token'
                });
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json({
                status: "Internal server error",
                message: 'Internal server error while trying to authenticate your token. Please check that your token is well-formed.'
            });
        }
    }
    else {
        const err_msg = 'Authorization header missing or incorrect';
        res.status(401).json({

            status: "Unauthorized",
            uri: req.status.uri,
            message: err_msg
        });
    }

}

module.exports = checkAuthorization;