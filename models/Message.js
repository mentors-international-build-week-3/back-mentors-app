const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a Message model using Schema
const MessageSchema = new Schema({
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
    noAttendReason: {
        type: String
    },
    needBooks: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);