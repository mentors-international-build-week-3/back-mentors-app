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

    let menteeNumber = req.body.From; // refers to mentee's phone number
    let appNumber = req.body.To; // refers to the app's phone number
    let smsBody = req.body.Body; // refers to the BODY of the new message that is sent

    Message.find({phoneNumber: menteeNumber}, (err, message) => {
        console.log(message, smsBody);

        if (message.length !==0) {

            if (!message[0].menteeFirstName && !message[0].menteeLastName && !message[0].attending) {
                Message.findByIdAndUpdate(message[0]._id, {"$set": {"menteeFirstName": body}}, {"new": true, "upsert": true}, () => {
                    client.messages.create({
                        to: `${menteeNumber}`,
                        from: `${appNumber}`,
                        body: `Great! And how about your last name?`
                    })

                    res.end();
                })
            } else if (!message[0].menteeLastName && !message[0].attending) {
                Message.findByIdAndUpdate(message[0]._id, {"$set": {"menteeLastName": body}}, {"new": true, "upsert": true}, () => {
                    client.messages.create({
                        to: `${menteeNumber}`,
                        from: `${appNumber}`,
                        body: `Awesome, ${menteeFirstName}! Last question: Do you plan on attending your next mentor session? Please reply "y" for YES or "n" for NO.`
                    })

                    res.end();
                })
            } else if (!message[0].attending) {
                Message.findByIdAndUpdate(message[0]._id, {"$set": {"attending": body}}, {"new": true, "upsert": true}, () => {
                    if ((body === "y") || (body === "Y") || (body === "n") || (body === "N")) {
                        if ((body === "y") || (body === "Y")) {
                            client.messages.create({
                                to: `${menteeNumber}`,
                                from: `${appNumber}`,
                                body: `Perfect, ${menteeFirstName}! We'll save your spot for you! Have an awesome day!`
                            })
        
                            res.end();
                        } else if ((body === "n") || (body === "N")) {
                            client.messages.create({
                                to: `${menteeNumber}`,
                                from: `${appNumber}`,
                                body: `Oh no! We're sorry to hear won't you be able to join us, ${menteeFirstName}. Please notify your mentor ASAP to reschedule another mentor session! Thank you and have a wonderful day!`
                            })
        
                            res.end();
                        }
                    } else {
                        client.messages.create({
                            to: `${menteeNumber}`,
                            from: `${appNumber}`,
                            body: `I'm sorry, ${menteeFirstName}, that wasn't a valid response. Please try again, but try to reply "y" for YES or "n" for NO.`
                        })
    
                        res.end();
                    }
                })
            }
        } else {

            if (smsBody === 'RSVP') {

                let newMessage = new Message();
                newMessage.phoneNumber = menteeNumber;

                newMessage.save(() => {
                    client.messages.create({
                        to: `${menteeNumber}`,
                        from: `${appNumber}`,
                        body: `Hi! Your number wasn't recognized in our database. What is your first name?`
                    })

                    res.end();
                })
            }
        }

        res.end();
    });


    // if (!menteeNumberMatch) {
    //     console.log("Sorry, no matching phone number was found in the database...womp womp.");

    //     client.messages.create({
    //         to: `${menteeNumber}`,
    //         from: `${appNumber}`,
    //         body: "Your phone number is not in our database, but we can save it if you'd like!"
    //     });

    //     res.status(404).json({ error_message: "No matching message was found"});
    // } else {
    //     console.log("Matching phone number was found in the database!!!");
    //     console.log(menteeNumberMatch);

    //     client.messages.create({
    //         to: `${menteeNumber}`,
    //         from: `${appNumber}`,
    //         body: "We recognized your phone number in our database! Awesome!"
    //     });

    //     res.status(200).json({ match: true });
    // }
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
