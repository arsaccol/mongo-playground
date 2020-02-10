const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const user_schema = new mongoose.Schema({
    email: { 
        type: String,
        //required: true,
        //index: { unique: true }
    },
    username: {
        type: String,
        //required: true
    },
    name: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required: true
    },
});

user_schema.statics.findByCredentials = async (email, password) => {
    const user = await user_model.findOne({email: email});

    if(!user) 
        throw new Error({error: 'Invalid login credentials'});

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch)
        throw new Error({error: 'Invalid login credentials'});
    else
        return user;
};

user_schema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});


user_schema.methods.generateAuthToken = async function() { 
    const user = this;
    const token = jwt.sign({email: user.email, username: user.username}, process.env.JWT_KEY, {expiresIn: "1h"});
    return token;
};


const user_model = mongoose.model('User', user_schema);

module.exports = user_model;