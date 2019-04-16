require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");

const db = require('./config/keys').mongoURI;
const twilioSid = require('./config/keys').accountSid;
const twilioAuthToken = require('./config/keys').authToken;


const client = new twilio(twilioSid, twilioAuthToken);

const server = express();

server.use(express.json());


let MessageSchema = new mongoose.Schema({
  phoneNumber: String,
  studentName: String,
  studentClass: String,
  apptDate: String
});

let Message = mongoose.model("Message", MessageSchema);

// connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('The MongoDB is connected!');
    })
    .catch(err => {
        console.log(err)
    });



server.get("/", (req, res) => {
  res.end();
});

server.post("/inbound", (req, res) => {
  let from = req.body.From; // this refers to the mentor's phone number, which new messages will be sent FROM
  let to = req.body.To; // this refers to the client's phone number, which is where the new messages will be sent TO
  let body = req.body.Body; // this references the BODY of the new message that will be sent

  Message.find({ phoneNumber: req.body.From }, (err, message) => {
    // console.log(message);

    if (message.length !== 0) {
      // this means there is a conversation stored in our mongoDB that we can continue
      if (
        !message[0].studentName &&
        !message[0].studentClass &&
        !message[0].apptDate
      ) {
        // if there is no matching 'studentName', 'studentClass', or 'apptDate' info in our DB,
        // then we know this is the info the clients wants to update
        Message.findByIdAndUpdate(
          message[0]._id,
          { $set: { studentName: body } },
          { new: true, upsert: true },
          () => {
            client.messages.create({
              to: `${from}`,
              from: `${to}`,
              body: "Which mentorship training class do you attend?"
            });

            res.end();
          }
        );
      } else if (!message[0].studentClass && !message[0].apptDate) {
        // if there is no matching 'studentClass' or 'apptDate' info in our DB, then we know this is the info the clients wants to update
        Message.findByIdAndUpdate(
          message[0]._id,
          { $set: { studentClass: body } },
          { new: true, upsert: true },
          () => {
            client.messages.create({
              to: `${from}`,
              from: `${to}`,
              body: "What is the date of your next mentorship session?"
            });

            res.end();
          }
        );
      } else if (!message[0].apptDate) {
        // if there is no matching 'apptDate' info in our DB, then we know this is the info the clients wants to update
        Message.findByIdAndUpdate(
          message[0]._id,
          { $set: { apptDate: body } },
          { new: true, upsert: true },
          () => {
            client.messages.create({
              to: `${from}`,
              from: `${to}`,
              body:
                "Thanks for setting up your automated mentors int'l text reminder! See you soon!"
            });

            res.end();
          }
        );
      }
    } else {
      if (body === "RSVP") {
        let newMessage = new Message();
        newMessage.phoneNumber = from;
        newMessage.save(() => {
          client.messages.create({
            // this creates a new return message to send BACK to the owner of the incoming text
            to: `${from}`, // the 'from' refers to the sender's phone number, which now becomes the receiver's phone number for our new return message
            from: `${to}`, // the 'to' refers to the Mentors App phone number, which now becomes the sender's phone number in the new return message
            body: "Hi! What's your name?"
          });

          res.end();
        });
      }
    }

    res.end();
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(
    `\n** The Mentors App server is up and running on port ${port} **\n`
  );
});
