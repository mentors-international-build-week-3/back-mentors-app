require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const twilio = require("twilio");


// twilio credentials
const twilioSid = require('./config/keys').accountSid;
const twilioAuthToken = require('./config/keys').authToken;
const client = new twilio(twilioSid, twilioAuthToken);



let MessageSchema = new mongoose.Schema({
    menteeFirstName: {
        type: String
    },
    menteeLastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    attending: {
        type: String
    },
    noAttendReason: {
        type: String
    },
    needBooks: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

let Message = mongoose.model('Message', MessageSchema);


// any requests that go to the '/api/mentees' endpoint will refer to this folder
const mentees = require('./routes/api/mentees');
// any requests that go to the '/api/messages' endpoint will refer to this folder
// const messages = require('./routes/api/messages');
// any requests that go to the '/api/users' endpoint will refer to this folder
const users = require('./routes/api/users');


const server = express();

server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));

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

// tells the server to use the routes from the 'mentees' constant (defined above), 
// for any requests to the '/api/mentees' endpoint
server.use('/api/mentees', mentees); 

// tells the server to use the routes from the 'users' constant (defined above), 
// for any requests to the '/api/users' endpoint
server.use('/api/users', users); 


server.get('/api/messages', (req, res) => {
    Message
        .find()
        .sort({ createdDate: -1 }) // sorts all retrieved messages by createdDate; "-1" = descending order, "1" = ascending order 
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            res.status(500).res.json(err);
        });
});

// @route   POST request to the '/api/messages' endpoint
// @desc    Creates a new message document
// @access  Public 
server.post('/api/messages', (req, res) => {

    let from = req.body.From; // refers to mentor's phone number
    let to = req.body.To; // refers to the mentee's phone number
    let body = req.body.Body; // refers to the BODY of the new message that is sent

    Message
        .findById(req.params.id)
        .then(message => {
            console.log("The ngrok URL received the message and forwarded it to our localhost with a webhook!");
            console.log(body);

            let newMessage = new Message({
                phoneNumber: req.body.From,
            }); 

            newMessage
                .save() // saves the new message object as a new document in our MongoDB
                .then(message => {
                    res.json(message);
                })
                .catch(err => {
                    res.json(err);
                });

            client.messages.create({
                to: `${req.body.From}`,
                from: `${req.body.To}`,
                body: 'We just saved your number to the database!'
            });
        })
        .catch(err => {
            client.messages.create({
                to: `${from}`,
                from: `${to}`,
                body: "Sorry! We couldn't save your number in the DB!"
            });

            res.status(404).json({ error_message: "No matching message was found"});
        });






    // Message.find({ phoneNumber: req.body.From }, (err, message) => {
    //     console.log("The ngrok URL received the message and forwarded it to our localhost with a webhook!");
    //     console.log(body);
    
    //     if (message.length !== 0) {
    //         // continue conversation
    //     } else {
    //         if (body === 'RSVP') {
    //             let newMessage = new Message();
    //             newMessage.phoneNumber = from;
    //             newMessage.save(() => {
    //                 client.messages.create({
    //                     to: `${from}`,
    //                     from: `${to}`,
    //                     body: 'What is your group name?'
    //                 });
    //             });
    //         } else {
    //             res.end();
    //         }
    //     }
    //     res.end();
    // })
    // .catch(err => {
    //     res.status(404).json({ error_message: "Couldn't find a matching message" });
    // });
});

// tells the server to use the routes from the 'conversations' constant (defined above), 
// for any requests to the '/' endpoint
// server.use('/api/messages', messages);


const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(
    `\n** The Mentors App server is up and running on port ${port} **\n`
  );
});
