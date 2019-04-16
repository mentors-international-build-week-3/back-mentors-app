const express = require('express');
const router = express.Router();

// Imports the Mentee Model (so we can query 'mentees' collection in the MongoDB)
const Mentee = require('../../models/Mentee');


// @route   GET request to the '/api/mentees' endpoint
// @desc    Retrieves all mentees from MongoDB
// @access  Public 
router.get('/', (req, res) => {
    Mentee.find()
        .sort({ createdDate: -1 }) // sorts all retrieved mentees by createdDate; "-1" = descending order, "1" = ascending order 
        .then(mentees => {
            res.status(200).json(mentees);
        })
        .catch(err => {
            res.status(500).res.json(err);
        });
});


// @route   POST request to the '/api/mentees' endpoint
// @desc    Creates a new mentee document
// @access  Public 
router.post('/', (req, res) => {
    // 'new' refers to the creation of a new instance of the 'Mentee' model from Message.js
    // 'Mentee' refers to the use of the 'Mentee' model (from Schema) as a template to build our new instance
    const newMentee = new Mentee({
        menteeName: req.body.menteeName,
        phoneNumber: req.body.phoneNumber,
        groupName: req.body.groupName,
        appointmentDate: req.body.appointmentDate
    }); 

     
    newMentee
        .save() // saves the new mentee object as a new document in our MongoDB
        .then(mentee => {
            res.json(mentee);
        })
        .catch(err => {
            res.json(err);
        });
});


// @route   DELETE request to the 'api/mentees/:id' endpoint
// @desc    Deletes a specific mentee
// @access  Public 
router.delete('/:id', (req, res) => {
    Mentee
        .findById(req.params.id)
        .then(mentee => {
            mentee
                .remove()
                .then(() => {
                    res.status(202).json({ delete_success: true });
                })
                .catch(err => {
                    res.status(404).json({ error_message: "Mentee was not deleted because this mentee could not be found"});
                });
        })
        .catch(err => {
            res.status(500).json({ error_message: "Something went wrong while trying to delete this mentee from the database"});
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