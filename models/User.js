const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a User model using Schema
const UserSchema = new Schema({
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
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    checkedTeacher: {
        type: Boolean
    },
    checkedClient: {
        type: Boolean
    },
    checkedCountryManager: {
        type: Boolean
    },
    checkedBoardMember: {
        type: Boolean
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);