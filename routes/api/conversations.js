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

module.exports = router;