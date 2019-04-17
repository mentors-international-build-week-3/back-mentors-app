const mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    menteeFirstName: {
        type: String
    },
    menteeLastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    attending: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);