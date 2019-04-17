const express = require('express');
const router = express.Router();

// Imports the User Model (so we can query the 'users' collection in the MongoDB)
const User = require('../../models/User');


// @route   GET request to the '/api/users' endpoint
// @desc    Retrieves all users from MongoDB
// @access  Public 
router.get('/', (req, res) => {
    User
        .find()
        .sort({ createdDate: -1 }) // sorts all retrieved users by createdDate; "-1" = descending order, "1" = ascending order 
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// @route   POST request to the '/api/users' endpoint
// @desc    Creates a new user document
// @access  Public 
router.post('/', (req, res) => {
    // 'new' refers to the creation of a new instance of the 'User' model from User.js
    // 'User' refers to the use of the 'User' model (from Schema) as a template to build our new instance
    const newUser = new User({
        userame: req.body.username,
        password: req.body.password,
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userType: req.body.userType,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    }); 

     
    newUser
        .save() // saves the new user object as a new document in our MongoDB
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
});


// @route   DELETE request to the 'api/users/:id' endpoint
// @desc    Deletes a specific user
// @access  Public 
router.delete('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            user
                .remove()
                .then(() => {
                    res.status(202).json({ delete_success: true });
                })
                .catch(err => {
                    res.status(404).json({ error_message: "Something went wrong while trying to delete this user from the database" });
                });
        })
        .catch(err => {
            res.status(500).json({ error_message: "User was not deleted because this user could not be found in the database" });
        });
});


// @route   PUT request to 'api/users/:id'
// @desc    Updates a specific user's document
// @access  Public 
router.put('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then((user, err) => {
            if (!user) {

                res.status(404).json({ message: "User was not updated because this user could not be found" });
            } else {

                (req.body.username) ? user.username = req.body.username : null;
                (req.body.password) ? user.password = req.body.password : null;
                (req.body.password2) ? user.password2 = req.body.password2 : null;
                (req.body.userFirstName) ? user.userFirstName = req.body.userFirstName : null;
                (req.body.userLastName) ? user.userLastName = req.body.userLastName : null;
                (req.body.userType) ? user.userType = req.body.userType : null;
                (req.body.phoneNumber) ? user.phoneNumber = req.body.phoneNumber : null;
                (req.body.email) ? user.email = req.body.email : null;

                user
                    .save()
                    .then(user => {
                        res.status(202).json({ message: "User was updated successfully" });
                    })
                    .catch(err => {
                        res.status(400).json({ message: "Something went wrong while trying to update this user" });
                    });
            }
        });
});



module.exports = router;