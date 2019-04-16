const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates a Mentee model using Schema
const MenteeSchema = new Schema({
    menteeName: {
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

module.exports = Mentee = mongoose.model('mentee', MenteeSchema);