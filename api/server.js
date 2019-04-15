require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mongoUserPassword = process.env.MONGO_USER_PASSWORD;

const client = new twilio(accountSid, authToken);

server.use(express.json());

mongoose.connect(`mongodb+srv://ticotheps:${process.env.MONGO_USER_PASSWORD}>@mentors-db-hokei.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true }).then(() => {
    console.log('The mongoDB is connected!');
});

server.get('/', (req, res) => {
    res.end();
});

module.exports = server;