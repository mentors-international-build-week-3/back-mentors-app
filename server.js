require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path"); // deals with file paths
const passport = require("passport");
const twilio = require("twilio");


// twilio credentials
const twilioSid = require('./config/keys').accountSid;
const twilioAuthToken = require('./config/keys').authToken;
const client = new twilio(twilioSid, twilioAuthToken);


// any requests that go to the '/api/mentees' endpoint will refer to this folder
const mentees = require('./routes/api/mentees');
// any requests that go to the '/api/messages' endpoint will refer to this folder
const messages = require('./routes/api/messages');
// any requests that go to the '/api/users' endpoint will refer to this folder
const users = require('./routes/api/users');


const server = express();

server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// configures the MongoDB with the URI
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('The MongoDB is successfully connected with server.js!');
    })
    .catch(err => {
        console.log(err)
    });

// Passport middleware
server.use(passport.initialize());


// Passport configuration
require("./config/passport")(passport);


// route for the '/api/mentees' endpoint
server.use('/api/mentees', mentees); 
// route for the '/api/messages' endpoint
server.use('/api/messages', messages);
// route for the '/api/users' endpoint
server.use('/api/users', users); 

// serves static assets if in production
if(process.env.NODE_ENV === 'production') {
    // sets static folder
    server.use(express.static('client/build'));

    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(
    `\n** The Mentors App server is up and running on port ${port} **\n`
  );
});
