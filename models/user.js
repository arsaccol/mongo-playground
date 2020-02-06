const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//const userModel = mongoose.model('User', {
//    _id: mongoose.Schema.Types.ObjectId,
//    email: { type: mongoose.Schema.Types.email },
//    username: { type: String },
//    name: { type: mongoose.Schema.Types.name },
//    password: { type: mongoose.Schema.Types.password }
//});

const user_schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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

    registered_date: {
        type: Date,
        //required: true
    },
    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
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

const user_model = mongoose.model('User', user_schema);

module.exports = user_model;