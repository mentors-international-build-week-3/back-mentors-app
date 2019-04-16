const express = require('express');
const router = express.Router();

// Imports the Mentee Model (so we can query the 'mentees' collection in the MongoDB)
const Mentee = require('../../models/Mentee');


// @route   GET request to the '/api/mentees' endpoint
// @desc    Retrieves all mentees from MongoDB
// @access  Public 
router.get('/', (req, res) => {
    Mentee
        .find()
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


// @route   PUT request to 'api/mentees/update/:id'
// @desc    Updates a specific mentee's document
// @access  Public 
router.put('/update/:id', (req, res) => {
    Mentee
        .findById(req.params.id)
        .then((mentee, err) => {
            if (!mentee) {

                res.status(404).json({ message: "Mentee was not updated because this mentee could not be found" });
            } else {

                mentee.menteeName = req.body.menteeName;
                mentee.phoneNumber = req.body.phoneNumber;
                mentee.groupName = req.body.groupName;
                mentee.appointmentDate = req.body.appointmentDate;

                mentee
                    .save()
                    .then(mentee => {
                        res.status(202).json({ message: "Mentee was updated successfully" });
                    })
                    .catch(err => {
                        res.status(400).json({ message: "Something went wrong while trying to update this mentee" });
                    });
            }
        });
});



module.exports = router;