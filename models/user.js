const mongoose = require('mongoose');

//const userModel = mongoose.model('User', {
//    _id: mongoose.Schema.Types.ObjectId,
//    email: { type: mongoose.Schema.Types.email },
//    username: { type: String },
//    name: { type: mongoose.Schema.Types.name },
//    password: { type: mongoose.Schema.Types.password }
//});

const user_model = mongoose.model('User', {
    _id: mongoose.Types.ObjectId,
    email: { 
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    registered_date: {
        type: Date,
        required: true
    },
    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = user_model;