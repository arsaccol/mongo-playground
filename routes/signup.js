const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


router.use(express.json());


router.get('/', (req, res) => {
    mongoose.connect(process.env.MONGODB_PATH + process.env.DB_NAME, {useNewUrlParser: true});



    res.send('signup GETTO!');
});

// Expected route: /api/signup
router.post('/', (req, res) => {
    const { email, username, name, password } = req.body;
    
    const hashed_pwd = bcrypt.hashSync(password, 10);
    
    
    //console.log(new_user_data);
    res.send(JSON.stringify({ email, username, name,  hashed_pwd }, null, 2));
});



module.exports = router;