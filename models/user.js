const mongoose = require('mongoose');

const userSchema = mongoose.model('User', {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: mongoose.Schema.Types.email },
    username: { type: String },
    name: { type: mongoose.Schema.Types.name },
    password: { type: mongoose.Schema.Types.password }
});

module.exports = userSchema;