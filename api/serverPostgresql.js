require("dotenv").config();
const express = require("express");
const server = express();
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "The PostgreSQL server is live!" });
});

module.exports = server;
