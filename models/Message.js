const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a Message model using Schema
const MessageSchema = new Schema({
    clientName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    groupName: {
        type: String,
    },
    appointmentDate: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);