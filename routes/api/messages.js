// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const twilio = require("twilio");

// // twilio credentials
// const twilioSid = require('../../config/keys').accountSid;
// const twilioAuthToken = require('../../config/keys').authToken;
// const client = new twilio(twilioSid, twilioAuthToken);

// // Imports the Message Model (so we can query the 'messages' collection in the MongoDB)
// // const Message = require('../../models/Message');


// // @route   GET request to the '/api/messages' endpoint
// // @desc    Retrieves all messages from MongoDB
// // @access  Public 
// // router.get('/', (req, res) => {
// //     Message
// //         .find()
// //         .sort({ createdDate: -1 }) // sorts all retrieved messages by createdDate; "-1" = descending order, "1" = ascending order 
// //         .then(messages => {
// //             res.status(200).json(messages);
// //         })
// //         .catch(err => {
// //             res.status(500).json(err);
// //         });
// // });












// // @route   POST request to the '/api/messages' endpoint
// // @desc    Creates a new message document
// // @access  Public 
// router.post('/', (req, res) => {

//     let from = req.body.From; // refers to mentor's phone number
//     let to = req.body.To; // refers to the mentee's phone number
//     let body = req.body.Body; // refers to the BODY of the new message that is sent
  
//     Message.find({ phoneNumber: req.body.From }, (err, message) => {
//         console.log("The ngrok URL received the message and forwarded it to our localhost with a webhook!");
//         console.log(body);
    
//         if (message.length !== 0) {

//         } else {
//             if (body === 'RSVP') {
//                 let newMessage = new Message();
//                 newMessage.phoneNumber = from;
//                 newMessage.save(() => {
//                     client.messages.create({
//                         to: `${from}`,
//                         from: `${to}`,
//                         body: 'What is your group name?'
//                     });
//                 });
//             } else {
//                 res.end();
//             }
//         }
        //     // continue conversation
        // } else {
        //   if (body === "RSVP") {
        //     let newMessage = new Message();
        //     newMessage.phoneNumber = from;
        //     newMessage.save(() => {
        //       client.messages.create({
        //         // this creates a new return message to send BACK to the mentee
        //         to: `${from}`, // 'from' refers to the mentee's phone number in the return message
        //         from: `${to}`, // 'to' refers to the mentor's phone number in the return message
        //         body: "Hi! What's your name?"
        //       })
    
        //       res.end();
        //     });
        //   } else {
        //       return "Something went wrong";
        //   }
        // }
//         res.end();
//     });
// });













// @route   DELETE request to the 'api/messages/:id' endpoint
// @desc    Deletes a specific message
// @access  Public 
// router.delete('/:id', (req, res) => {
//     Message
//         .findById(req.params.id)
//         .then(message => {
//             message
//                 .remove()
//                 .then(() => {
//                     res.status(202).json({ delete_success: true });
//                 })
//                 .catch(err => {
//                     res.status(404).json({ error_message: "Message was not deleted because this message could not be found"});
//                 });
//         })
//         .catch(err => {
//             res.status(500).json({ error_message: "Something went wrong while trying to delete this message from the database"});
//         });
// });


// @route   PUT request to 'api/messages/:id'
// @desc    Updates a specific message's document
// @access  Public 
// router.put('/:id', (req, res) => {
//     Message
//         .findById(req.params.id)
//         .then((message, err) => {
//             if (!message) {

//                 res.status(404).json({ error_message: "Message was not updated because this message could not be found" });
//             } else {

//                 (req.body.menteeFirstName) ? message.menteeFirstName = req.body.menteeFirstName : null;
//                 (req.body.menteeLastName) ? message.menteeLastName = req.body.menteeLastName : null;
//                 (req.body.phoneNumber) ? message.phoneNumber = req.body.phoneNumber : null;
//                 (req.body.attending) ? message.attending = req.body.attending : null;
//                 (req.body.noAttendReason) ? message.noAttendReason = req.body.noAttendReason : null;
//                 (req.body.needBooks) ? message.needBooks = req.body.needBooks : null;

//                 message
//                     .save()
//                     .then(message => {
//                         res.status(202).json({ error_message: "Message was updated successfully" });
//                     })
//                     .catch(err => {
//                         res.status(400).json({ error_message: "Something went wrong while trying to update this message" });
//                     });
//             }
//         });
// });


// module.exports = router;