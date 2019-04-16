const express = require('express');
const router = express.Router();

// Imports the Message Model (so we can query the 'messages' collection in the MongoDB)
const Message = require('../../models/Message');


// @route   GET request to the '/api/messages' endpoint
// @desc    Retrieves all messages from MongoDB
// @access  Public 
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
    // 'new' refers to the creation of a new instance of the 'Message' model from Message.js
    // 'Message' refers to the use of the 'Message' model (from Schema) as a template to build our new instance
    const newMessage = new Message({
        menteeFirstName: req.body.menteeFirstName,
        menteeLastName: req.body.menteeLastName,
        phoneNumber: req.body.phoneNumber,
        attending: req.body.attending,
        noAttendReason: req.body.noAttendReason,
        needBooks: req.body.needBooks
    }); 

     
    newMessage
        .save() // saves the new message object as a new document in the MongoDB
        .then(message => {
            res.json(message);
        })
        .catch(err => {
            res.json(err);
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
                    res.status(404).json({ error_message: "Message was not deleted because this message could not be found"});
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
                (req.body.noAttendReason) ? message.noAttendReason = req.body.noAttendReason : null;
                (req.body.needBooks) ? message.needBooks = req.body.needBooks : null;

                message
                    .save()
                    .then(message => {
                        res.status(202).json({ error_message: "Message was updated successfully" });
                    })
                    .catch(err => {
                        res.status(400).json({ error_message: "Something went wrong while trying to update this message" });
                    });
            }
        });
});


module.exports = router;

  
//   server.post("/inbound", (req, res) => {
//     let from = req.body.From; // this refers to the mentor's phone number, which new messages will be sent FROM
//     let to = req.body.To; // this refers to the client's phone number, which is where the new messages will be sent TO
//     let body = req.body.Body; // this references the BODY of the new message that will be sent
  
//     Message.find({ phoneNumber: req.body.From }, (err, message) => {
//       // console.log(message);
  
//       if (message.length !== 0) {
//         // this means there is a conversation stored in our mongoDB that we can continue
//         if (
//           !message[0].studentName &&
//           !message[0].studentClass &&
//           !message[0].apptDate
//         ) {
//           // if there is no matching 'studentName', 'studentClass', or 'apptDate' info in our DB,
//           // then we know this is the info the clients wants to update
//           Message.findByIdAndUpdate(
//             message[0]._id,
//             { $set: { studentName: body } },
//             { new: true, upsert: true },
//             () => {
//               client.messages.create({
//                 to: `${from}`,
//                 from: `${to}`,
//                 body: "Which mentorship training class do you attend?"
//               });
  
//               res.end();
//             }
//           );
//         } else if (!message[0].studentClass && !message[0].apptDate) {
//           // if there is no matching 'studentClass' or 'apptDate' info in our DB, then we know this is the info the clients wants to update
//           Message.findByIdAndUpdate(
//             message[0]._id,
//             { $set: { studentClass: body } },
//             { new: true, upsert: true },
//             () => {
//               client.messages.create({
//                 to: `${from}`,
//                 from: `${to}`,
//                 body: "What is the date of your next mentorship session?"
//               });
  
//               res.end();
//             }
//           );
//         } else if (!message[0].apptDate) {
//           // if there is no matching 'apptDate' info in our DB, then we know this is the info the clients wants to update
//           Message.findByIdAndUpdate(
//             message[0]._id,
//             { $set: { apptDate: body } },
//             { new: true, upsert: true },
//             () => {
//               client.messages.create({
//                 to: `${from}`,
//                 from: `${to}`,
//                 body:
//                   "Thanks for setting up your automated mentors int'l text reminder! See you soon!"
//               });
  
//               res.end();
//             }
//           );
//         }
//       } else {
//         if (body === "RSVP") {
//           let newMessage = new Message();
//           newMessage.phoneNumber = from;
//           newMessage.save(() => {
//             client.messages.create({
//               // this creates a new return message to send BACK to the owner of the incoming text
//               to: `${from}`, // the 'from' refers to the sender's phone number, which now becomes the receiver's phone number for our new return message
//               from: `${to}`, // the 'to' refers to the Mentors App phone number, which now becomes the sender's phone number in the new return message
//               body: "Hi! What's your name?"
//             });
  
//             res.end();
//           });
//         }
//       }
  
//       res.end();
//     });
//   });