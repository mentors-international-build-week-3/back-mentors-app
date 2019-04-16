const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a User model using Schema
const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    userType: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);