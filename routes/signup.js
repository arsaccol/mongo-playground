const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const url = require('url');
const db_url = url.resolve(process.env.MONGODB_PATH, process.env.DB_NAME);

router.use(express.json());


router.get('/', (req, res) => {
    //mongoose.connect(url.resolve(process.env.MONGODB_PATH, process.env.DB_NAME), {useNewUrlParser: true});



    res.send(
        url.resolve(db_url, 'bugabuga')
    );
});

// Expected route: /api/signup
router.post('/', (req, res) => {
    const { email, username, name, password } = req.body;
    
    mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true});
    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', () => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            username: username,
            name: name,
            password: bcrypt.hashSync(password, 10),
            registered_date: Date.now()
        });


        // Check whether user with this email exists
        User.find({email: email}, function(err, users) {
            if(err)
                console.log(error);
            // Save if it doesn't
            else if(users.length === 0) {
                user.save( function(err, user) {
                    console.log(JSON.stringify(user, null, 2));
                    res.json({
                        status: 200,
                        message: 'User successfully created'
                    })
                });
            }
            else {
                res.json({
                    status: 409,
                    message: 'The user you are trying to create already exists'
                });
            }
        });


        

        //console.log(user);
        //res.send(JSON.stringify(user, null, 2));
    });
    
});



module.exports = router;