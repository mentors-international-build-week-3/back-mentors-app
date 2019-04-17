const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a User model using Schema
const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    password2: {
        type: String,
        require: true
    },
    userFirstName: {
        type: String,
        require: true
    },
    userLastName: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);