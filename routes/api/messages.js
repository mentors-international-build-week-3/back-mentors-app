require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const twilio = require("twilio");

// twilio credentials
const twilioSid = require("../../config/keys").accountSid;
const twilioAuthToken = require("../../config/keys").authToken;
const client = new twilio(twilioSid, twilioAuthToken);


// Imports the Message Model (so we can query the 'messages' collection in the MongoDB)
const Message = require("../../models/Message");


// @route   GET request to the '/api/messages' endpoint
// @desc    Retrieves all messages from MongoDB
// @access  Public
router.get("/", (req, res) => {
  Message.find()
    .sort({ createdDate: -1 }) // sorts all retrieved messages by createdDate; "-1" = descending order, "1" = ascending order
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(500).res.json(err);
    });
});


// @route   GET request to the '/api/newmessage' endpoint
// @desc    Sends a single SMS to a specific phone number
// @access  Public
router.get('/newsms', (req, res) => {
    
    const { recipient, textmessage } = req.query

    // Send Text
    client.messages
        .create({
            body: textmessage,
            from: '+19892626512', // from Mentors App
            to: recipient
    })
    .then((message) => console.log(message.body));
})


// @route   POST request to the '/api/messages' endpoint
// @desc    Creates an SMS conversation with the mentee; creates a new message document
// @access  Public 
router.post('/', async (req, res) => {

    let menteeNumber = req.body.From; // refers to mentee's phone number
    let appNumber = req.body.To; // refers to the app's phone number
    let smsBody = req.body.Body; // refers to the BODY of the new message that is sent

    Message.find({phoneNumber: menteeNumber}, (err, message) => {
        console.log(smsBody);

        if (message.length !==0) {

            if (!message[0].menteeFirstName && !message[0].menteeLastName && !message[0].attending) {
                Message.findByIdAndUpdate(message[0]._id, {"$set": {"menteeFirstName": smsBody}}, {"new": true, "upsert": true}, () => {
                    client.messages.create({
                        to: `${menteeNumber}`,
                        from: `${appNumber}`,
                        body: `Great! And how about your last name, ${smsBody}?`
                    })

                    res.end();
                })
                .catch(err => {
                    res.status(500).json(err);
                });
            } else if (!message[0].menteeLastName && !message[0].attending) {
                Message.findByIdAndUpdate(message[0]._id, {"$set": {"menteeLastName": smsBody}}, {"new": true, "upsert": true}, () => {
                    client.messages.create({
                        to: `${menteeNumber}`,
                        from: `${appNumber}`,
                        body: `Awesome, ${message[0].menteeFirstName}! Last question: Do you plan on attending your next mentor session with us? Please reply "1" for YES or "0" (zero) for NO.`
                    })

                    res.end();
                })
                .catch(err => {
                    res.status(500).json(err);
                });
            } else if (!message[0].attending) {
                Message.findByIdAndUpdate(message[0]._id, {"$set": {"attending": smsBody}}, {"new": true, "upsert": true}, () => {
                    if (smsBody === "1") {

                        client.messages.create({
                            to: `${menteeNumber}`,
                            from: `${appNumber}`,
                            body: `Perfect, ${message[0].menteeFirstName}! We'll save a spot for you! Thanks for your time and have an awesome day!`
                        })
        
                        res.end();
                    } else if (smsBody === "0") {
                        client.messages.create({
                            to: `${menteeNumber}`,
                            from: `${appNumber}`,
                            body: `Oh no! We're sorry to hear that you won't be joining us, ${message[0].menteeFirstName}. Don't worry! We'll notify your mentor, ASAP, to reschedule another mentor session for you! :)`
                        })
        
                        res.end();
                    } else {
                        client.messages.create({
                            to: `${menteeNumber}`,
                            from: `${appNumber}`,
                            body: `I'm sorry, ${message[0].menteeFirstName}, that wasn't a valid response. Please try again, but try to reply "1" for YES or "0" (zero) for NO.`
                        })
    
                        res.end();
                    }
                })
                .catch(err => {
                    res.status(500).json(err);
                });
            } else if (!message[0].attending) {
                Message.findByIdAndUpdate(message[0]._id, {"$set": {"attending": smsBody}}, {"new": true, "upsert": true}, () => {
                    if (smsBody === "1") {

                        client.messages.create({
                            to: `${menteeNumber}`,
                            from: `${appNumber}`,
                            body: `Perfect, ${message[0].menteeFirstName}! We'll save a spot for you! Have an awesome day!`
                        })
        
                        res.end();
                    } else if (smsBody === "0") {
                        client.messages.create({
                            to: `${menteeNumber}`,
                            from: `${appNumber}`,
                            body: `Oh no! We're sorry to hear that you won't be joining us, ${message[0].menteeFirstName}. Don't worry! We'll notify your mentor, ASAP, to reschedule another mentor session for you! :)`
                        })
        
                        res.end();
                    } else {
                        client.messages.create({
                            to: `${menteeNumber}`,
                            from: `${appNumber}`,
                            body: `I'm sorry, ${message[0].menteeFirstName}, you've exhaused the maximum number of attempts to answer this question. Please text "RSVP" to this number again to get access to more attempts! Thanks!`
                        })
    
                        res.end();
                    }
                })
                .catch(err => {
                    res.status(500).json(err);
                });
            }
        } else {

            if ((smsBody === 'RSVP') ||(smsBody === 'rsvp') || (smsBody === 'Rsvp')) {

                let newMessage = new Message();
                newMessage.phoneNumber = menteeNumber;
    
                newMessage.save(() => {
                    client.messages.create({
                        to: `${menteeNumber}`,
                        from: `${appNumber}`,
                        body: `Hi! Your phone number wasn't recognized by our database. What's your first name?`
                    })
    
                    res.end();
                })

                res.end();
            }
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// @route   DELETE request to the 'api/messages/:id' endpoint
// @desc    Deletes a specific message
// @access  Public
router.delete('/:id', (req, res) => {
    Message
        .findById(req.params.id)
        .then(message => {
            message
                .remove()
                .then(() => {
                    res.status(202).json({ delete_success: true });
                })
                .catch(err => {
                    res.status(404).json({ delete_status: "Message was not deleted because this message could not be found"});
                });
        })
        .catch(err => {
            res.status(500).json({ error_message: "Something went wrong while trying to delete this message from the database"});
        });
});

// @route   PUT request to 'api/messages/:id'
// @desc    Updates a specific message's document
// @access  Public
router.put('/:id', (req, res) => {
    Message
        .findById(req.params.id)
        .then((message, err) => {
            if (!message) {

                res.status(404).json({ error_message: "Message was not updated because this message could not be found" });
            } else {

                (req.body.menteeFirstName) ? message.menteeFirstName = req.body.menteeFirstName : null;
                (req.body.menteeLastName) ? message.menteeLastName = req.body.menteeLastName : null;
                (req.body.phoneNumber) ? message.phoneNumber = req.body.phoneNumber : null;
                (req.body.attending) ? message.attending = req.body.attending : null;


                message
                    .save()
                    .then(message => {
                        res.status(202).json({ update_status: "Message was updated successfully" });
                    })
                    .catch(err => {
                        res.status(400).json({ error_message: "Something went wrong while trying to update this message" });
                    });
            }
        });
});

module.exports = router;
