const express = require('express');
const router = express.Router();

// Imports the Conversation Model (so we can query the 'conversations' collection in the MongoDB)
const Conversation = require('../../models/Conversation');


// @route   GET request to the '/api/conversations' endpoint
// @desc    Retrieves all conversations from MongoDB
// @access  Public 
router.get('/', (req, res) => {
    Conversation
        .find()
        .sort({ createdDate: -1 }) // sorts all retrieved conversations by createdDate; "-1" = descending order, "1" = ascending order 
        .then(conversations => {
            res.status(200).json(conversations);
        })
        .catch(err => {
            res.status(500).res.json(err);
        });
});


// @route   POST request to the '/api/conversations' endpoint
// @desc    Creates a new conversation document
// @access  Public 
router.post('/', (req, res) => {
    // 'new' refers to the creation of a new instance of the 'Conversation' model from Conversation.js
    // 'Conversation' refers to the use of the 'Conversation' model (from Schema) as a template to build our new instance
    const newConversation = new Conversation({
        menteeName: req.body.menteeName,
        phoneNumber: req.body.phoneNumber,
        attending: req.body.attending,
        noAttendReason: req.body.noAttendReason,
        needBooks: req.body.needBooks
    }); 

     
    newConversation
        .save() // saves the new conversation object as a new document in the MongoDB
        .then(conversation => {
            res.json(conversation);
        })
        .catch(err => {
            res.json(err);
        });
});


// @route   DELETE request to the 'api/conversations/:id' endpoint
// @desc    Deletes a specific conversation
// @access  Public 
router.delete('/:id', (req, res) => {
    Conversation
        .findById(req.params.id)
        .then(conversation => {
            conversation
                .remove()
                .then(() => {
                    res.status(202).json({ delete_success: true });
                })
                .catch(err => {
                    res.status(404).json({ error_message: "Conversation was not deleted because this conversation could not be found"});
                });
        })
        .catch(err => {
            res.status(500).json({ error_message: "Something went wrong while trying to delete this conversation from the database"});
        });
});


// @route   PUT request to 'api/conversations/:id/update'
// @desc    Updates a specific conversation's document
// @access  Public 
router.put('/:id/update', (req, res) => {
    Conversation
        .findById(req.params.id)
        .then((conversation, err) => {
            if (!conversation) {

                res.status(404).json({ message: "Conversation was not updated because this conversation could not be found" });
            } else {

                conversation.menteeName = req.body.menteeName;
                conversation.phoneNumber = req.body.phoneNumber;
                conversation.attending = req.body.attending;
                conversation.noAttendReason = req.body.noAttendReason;
                conversation.needBooks = req.body.needBooks;

                conversation
                    .save()
                    .then(conversation => {
                        res.status(202).json({ message: "Conversation was updated successfully" });
                    })
                    .catch(err => {
                        res.status(400).json({ message: "Something went wrong while trying to update this conversation" });
                    });
            }
        });
});


module.exports = router;



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