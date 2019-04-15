require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;

server.use(express.json());



module.exports = server;