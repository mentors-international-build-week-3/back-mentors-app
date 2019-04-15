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

mongoose.connect(`mongodb+srv://ticotheps:${mongoUserPassword}>@mentors-db-hokei.mongodb.net/test?retryWrites=true`, {useMongoClient: true});



module.exports = server;