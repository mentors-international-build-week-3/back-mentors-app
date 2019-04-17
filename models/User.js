const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a User model using Schema
const UserSchema = new Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    password2: {
        type: String
    },
    userFirstName: {
        type: String
    },
    userLastName: {
        type: String
    },
    userType: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);