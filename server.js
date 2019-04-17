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



// let MessageSchema = new mongoose.Schema({
//     menteeFirstName: {
//         type: String
//     },
//     menteeLastName: {
//         type: String
//     },
//     phoneNumber: {
//         type: String
//     },
//     attending: {
//         type: String
//     },
//     createdDate:{
//         type: Date,
//         default: Date.now
//     }
// });

// let Message = mongoose.model('message', MessageSchema);


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

// tells the server to use the routes from the 'conversations' constant (defined above), 
// for any requests to the '/' endpoint
server.use('/api/messages', messages);

// tells the server to use the routes from the 'users' constant (defined above), 
// for any requests to the '/api/users' endpoint
server.use('/api/users', users); 


// server.get('/api/messages', (req, res) => {
//     Message
//         .find()
//         .sort({ createdDate: -1 }) // sorts all retrieved messages by createdDate; "-1" = descending order, "1" = ascending order 
//         .then(messages => {
//             res.status(200).json(messages);
//         })
//         .catch(err => {
//             res.status(500).res.json(err);
//         });
// });

// @route   POST request to the '/api/messages' endpoint
// @desc    Creates an SMS conversation with the mentee; creates a new message document
// @access  Public 
// server.post('/api/messages', async (req, res) => {

//     let menteeNumber = req.body.From; // refers to mentee's phone number
//     let appNumber = req.body.To; // refers to the app's phone number
//     let smsBody = req.body.Body; // refers to the BODY of the new message that is sent

//     Message.find({phoneNumber: menteeNumber}, (err, message) => {
//         console.log(smsBody);

//         if (message.length !==0) {

//             if (!message[0].menteeFirstName && !message[0].menteeLastName && !message[0].attending) {
//                 Message.findByIdAndUpdate(message[0]._id, {"$set": {"menteeFirstName": smsBody}}, {"new": true, "upsert": true}, () => {
//                     client.messages.create({
//                         to: `${menteeNumber}`,
//                         from: `${appNumber}`,
//                         body: `Great! And how about your last name, ${smsBody}?`
//                     })

//                     res.end();
//                 })
//                 .catch(err => {
//                     res.status(500).json(err);
//                 });
//             } else if (!message[0].menteeLastName && !message[0].attending) {
//                 Message.findByIdAndUpdate(message[0]._id, {"$set": {"menteeLastName": smsBody}}, {"new": true, "upsert": true}, () => {
//                     client.messages.create({
//                         to: `${menteeNumber}`,
//                         from: `${appNumber}`,
//                         body: `Awesome, ${message[0].menteeFirstName}! Last question: Do you plan on attending your next mentor session with us? Please reply "1" for YES or "0" (zero) for NO.`
//                     })

//                     res.end();
//                 })
//                 .catch(err => {
//                     res.status(500).json(err);
//                 });
//             } else if (!message[0].attending) {
//                 Message.findByIdAndUpdate(message[0]._id, {"$set": {"attending": smsBody}}, {"new": true, "upsert": true}, () => {
//                     if (smsBody === "1") {

//                         client.messages.create({
//                             to: `${menteeNumber}`,
//                             from: `${appNumber}`,
//                             body: `Perfect, ${message[0].menteeFirstName}! We'll save a spot for you! Thanks for your time and have an awesome day!`
//                         })
        
//                         res.end();
//                     } else if (smsBody === "0") {
//                         client.messages.create({
//                             to: `${menteeNumber}`,
//                             from: `${appNumber}`,
//                             body: `Oh no! We're sorry to hear that you won't be joining us, ${message[0].menteeFirstName}. Don't worry! We'll notify your mentor, ASAP, to reschedule another mentor session for you! :)`
//                         })
        
//                         res.end();
//                     } else {
//                         client.messages.create({
//                             to: `${menteeNumber}`,
//                             from: `${appNumber}`,
//                             body: `I'm sorry, ${message[0].menteeFirstName}, that wasn't a valid response. Please try again, but try to reply "1" for YES or "0" (zero) for NO.`
//                         })
    
//                         res.end();
//                     }
//                 })
//                 .catch(err => {
//                     res.status(500).json(err);
//                 });
//             } else if (!message[0].attending) {
//                 Message.findByIdAndUpdate(message[0]._id, {"$set": {"attending": smsBody}}, {"new": true, "upsert": true}, () => {
//                     if (smsBody === "1") {

//                         client.messages.create({
//                             to: `${menteeNumber}`,
//                             from: `${appNumber}`,
//                             body: `Perfect, ${message[0].menteeFirstName}! We'll save a spot for you! Have an awesome day!`
//                         })
        
//                         res.end();
//                     } else if (smsBody === "0") {
//                         client.messages.create({
//                             to: `${menteeNumber}`,
//                             from: `${appNumber}`,
//                             body: `Oh no! We're sorry to hear that you won't be joining us, ${message[0].menteeFirstName}. Don't worry! We'll notify your mentor, ASAP, to reschedule another mentor session for you! :)`
//                         })
        
//                         res.end();
//                     } else {
//                         client.messages.create({
//                             to: `${menteeNumber}`,
//                             from: `${appNumber}`,
//                             body: `I'm sorry, ${message[0].menteeFirstName}, you've exhaused the maximum number of attempts to answer this question. Please text "RSVP" to this number again to get access to more attempts! Thanks!`
//                         })
    
//                         res.end();
//                     }
//                 })
//                 .catch(err => {
//                     res.status(500).json(err);
//                 });
//             }
//         } else {

//             if ((smsBody === 'RSVP') ||(smsBody === 'rsvp') || (smsBody === 'Rsvp')) {

//                 let newMessage = new Message();
//                 newMessage.phoneNumber = menteeNumber;
    
//                 newMessage.save(() => {
//                     client.messages.create({
//                         to: `${menteeNumber}`,
//                         from: `${appNumber}`,
//                         body: `Hi! Your phone number wasn't recognized by our database. What's your first name?`
//                     })
    
//                     res.end();
//                 })

//                 res.end();
//             }
//         }
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     });
// });


const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(
    `\n** The Mentors App server is up and running on port ${port} **\n`
  );
});
