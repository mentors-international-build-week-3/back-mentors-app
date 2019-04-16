const express = require('express');
const router = express.Router();

// Imports the Message Model (so we can query the MongoDB)
const Message = require('../../models/Message');


// @route   GET request to the '/api/messages' endpoint
// @desc    Retrieves all messages from MongoDB
// @access  Public 
router.get('/', (req, res) => {
    Message.find()
        .sort({ date: -1 }) // sorts all retrieved messages by date; "-1" = descending order, "1" = ascending order 
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            res.status(500).res.json(err);
        });
});


// @route   POST request to '/api/messages'
// @desc    Creates a new message
// @access  Public 
router.post('/', (req, res) => {
    // 'new' refers to us creating a new instance of the 'Message' model we made in Message.js
    // 'Message' refers to the 'Message' model (from Schema) we created in Message.js
    const newMessage = new Message({
        clientName: req.body.clientName,
        phoneNumber: req.body.phoneNumber,
        groupName: req.body.groupName,
        appointmentDate: req.body.appointmentDate
    }); 

     
    newMessage
        .save() // saves the new message to our MongoDB
        .then(message => {
            res.json(message);
        })
        .catch(err => {
            res.json(err);
        });
});


// @route   DELETE request to 'api/messages/:id'
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
                    res.status(404).json({ error_message: "Item was not deleted because it could not be found"});
                });
        })
        .catch(err => {
            res.status(500).json({ error_message: "Something went wrong while trying to delete that message from the database"});
        });
});






// server.get("/", (req, res) => {
//     res.end();
//   });
  
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



module.exports = router;