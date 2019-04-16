require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");

// twilio credentials
const twilioSid = require('./config/keys').accountSid;
const twilioAuthToken = require('./config/keys').authToken;
const client = new twilio(twilioSid, twilioAuthToken);

// any requests that go to the '/api/messages' endpoint will refer to this folder
const messages = require('./routes/api/messages');

const server = express();

server.use(express.json());

// configures the MongoDB with the URI
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('The MongoDB is connected!');
    })
    .catch(err => {
        console.log(err)
    });

// tells the server to use the routes from the 'messages' constant, 
// which is defined above, for any requests to the '/api/messages' endpoint
server.use('/api/messages', messages); 

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(
    `\n** The Mentors App server is up and running on port ${port} **\n`
  );
});
