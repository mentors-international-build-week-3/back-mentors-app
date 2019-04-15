const express = require("express");
const mongoose = require("mongoose");
const server = express();
const twilio = require("twilio");
const accountSid = process.env.ACCOUNT_SID;

server.use(express.json());



module.exports = server;