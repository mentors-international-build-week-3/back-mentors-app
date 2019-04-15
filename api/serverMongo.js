require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const serverMongo = express();
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mongoPassword = process.env.MONGO_USER_PASSWORD;
const client = new twilio(accountSid, authToken);

serverMongo.use(express.json());

let MessageSchema = new mongoose.Schema({
    phoneNumber: String,
    clientName: String,
    className: String,
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

serverMongo.get("/", (req, res) => {
  res.end();
});

serverMongo.post('/inbound', (req, res) => {
    let from = req.body.From; // this refers to the mentor's phone number, which new messages will be sent FROM
    let to = req.body.To; // this refers to the client's phone number, which is where the new messages will be sent TO
    let body = req.body.Body; // this references the BODY of the new message that will be sent

    Message.find({phoneNumber: req.body.From}, (err, message) => {
        // console.log(message);

        if (message.length !== 0) {
            // if message.length !== 0, this means there is a conversation stored in our mongoDB that we can continue

        } else {
            if (body === 'RSVP') {
                let newMessage = new Message();
                newMessage.phoneNumber = from;
                newMessage.save(() => {
                    client.messages.create({
                        // this creates a new return message to send BACK to the owner of the incoming text
                        to: `${from}`, // the 'from' refers to the sender's phone number, which now becomes the receiver's phone number for our new return message
                        from: `${to}`, // the 'to' refers to the Mentors App phone number, which now becomes the sender's phone number in the new return message
                        body: "Hello! What's your name?",
                    })

                    res.end();
                });
            }
        }

        res.end();
    });
});

module.exports = serverMongo;
