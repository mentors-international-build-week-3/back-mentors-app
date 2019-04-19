const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a User model using Schema
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    userFirstName: {
        type: String
    },
    userLastName: {
        type: String
    },
    password: {
        type: String
    },
    password2: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);