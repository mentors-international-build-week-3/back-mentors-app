const express = require('express');
const router = express.Router();

// Imports the Message Model (so we can query the MongoDB)
const Message = require('../../models/Message');

// @route   GET request to the '/api/messages' endpoint
// @desc    Retrieves all messages from MongoDB
// @access  Public 
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 }) // sorts all retrieved items by date; "-1" = descending order, "1" = ascending order 
        .then(items => {
            res.status(200).json(items)
        })
        .catch(err => {
            res.status(500).res.json(err);
        });
});


module.exports = router;