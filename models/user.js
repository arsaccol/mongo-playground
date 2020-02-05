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
    email: String,
    username: String,
    name: String,
    password: String,
    registered_date: Date
});

module.exports = user_model;