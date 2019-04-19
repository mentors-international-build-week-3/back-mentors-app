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


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configures the MongoDB with the URI
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('The MongoDB has successfully connected with server.js!');
    })
    .catch(err => {
        console.log(err)
    });

// Passport middleware
app.use(passport.initialize());


// Passport configuration
require("./config/passport")(passport);


// route for the '/api/mentees' endpoint
app.use('/api/mentees', mentees); 
// route for the '/api/messages' endpoint
app.use('/api/messages', messages);
// route for the '/api/users' endpoint
app.use('/api/users', users); 

// serves static assets if in production
if(process.env.NODE_ENV === 'production') {
    // sets static folder
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `\n** The Mentors App back-end server is up and running on port ${port} **\n`
  );
});
