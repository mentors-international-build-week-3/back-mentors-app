const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a Conversation model using Schema
const ConversationSchema = new Schema({
    menteeName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    attending: {
        type: String,
    },
    noAttendReason: {
        type: String,
    },
    needBooks: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = Conversation = mongoose.model('conversation', ConversationSchema);