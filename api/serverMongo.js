require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mongoPassword = process.env.MONGO_USER_PASSWORD;
const client = new twilio(accountSid, authToken);

server.use(express.json());


let MessageSchema = new mongoose.Schema({
    phoneNumber: String,
    groupName: String,
    prepared: String,
    apptDate: String
});

let Message = mongoose.model('Message', MessageSchema);


mongoose
  .connect(
    `mongodb+srv://ticotheps:${mongoPassword}@mentors-db-hokei.mongodb.net/test?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("The MongoDB is connected!");
  })
  .catch(error => {
    console.log(error);
  });


server.get("/", (req, res) => {
  res.end();
});

server.post('/inbound', (req, res) => {
    let from = req.body.From; // this refers to the mentor's phone number, which new messages will be sent FROM
    let to = req.body.To; // this refers to the client's phone number, which is where the new messages will be sent TO
    let body = req.body.Body; // this references the BODY of the new message that will be sent
});

module.exports = server;
