require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// imports input validation
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");

// imports the User Model (so we can query the 'users' collection in the MongoDB)
const User = require("../../models/User");

// @route   GET request to the '/api/users' endpoint
// @desc    Retrieves all users from MongoDB
// @access  Public
router.get("/", (req, res) => {
  User.find()
    .sort({ createdDate: -1 }) // sorts all retrieved users by createdDate; "-1" = descending order, "1" = ascending order
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// @route   POST request to the '/api/users/signup' endpoint
// @desc    Creates a new user document
// @access  Public
router.post("/signup", (req, res) => {
  // validates form input
  const { errors, isValid } = validateSignupInput(req.body);

  // checks validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    // 'new' refers to the creation of a new instance of the 'User' model from User.js
    // 'User' refers to the use of the 'User' model (from Schema) as a template to build our new instance
    const newUser = new User({
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      checkedTeacher: req.body.checkedTeacher,
      checkedClient: req.body.checkedClient,
      checkedCountryManager: req.body.checkedCountryManager,
      checkedBoardMember: req.body.checkedBoardMember,
    });

    // hashes password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route 	POST requst to the 'api/users/login' endpoint
// @desc 	Logs user in and returns JWT token
// @access 	Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Checks if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Checks user's input hash against hash in the MongoDB
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matches
        // Creates a JWT Payload
        const payload = {
          id: user.id,
          userFirstName: user.userFirstName,
          userLastName: user.userLastName
        };

        // Signs the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 21600 }, // 21,600 sec => 6 hours
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route   DELETE request to the 'api/users/:id' endpoint
// @desc    Deletes a specific user
// @access  Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user
        .remove()
        .then(() => {
          res.status(202).json({ delete_success: true });
        })
        .catch(err => {
          res
            .status(404)
            .json({
              error_message:
                "Something went wrong while trying to delete this user from the database"
            });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error_message:
            "User was not deleted because this user could not be found in the database"
        });
    });
});

// @route   PUT request to 'api/users/:id'
// @desc    Updates a specific user's document
// @access  Public
router.put("/:id", (req, res) => {
  User.findById(req.params.id).then((user, err) => {
    if (!user) {
      res
        .status(404)
        .json({
          message: "User was not updated because this user could not be found"
        });
    } else {
      req.body.userFirstName ? (user.userFirstName = req.body.userFirstName) : null;
      req.body.userLastName ? (user.userLastName = req.body.userLastName) : null;
      req.body.password ? (user.password = req.body.password) : null;
      req.body.email ? (user.email = req.body.email) : null;
      req.body.phoneNumber ? (user.phoneNumber = req.body.phoneNumber) : null;
      req.body.checkedTeacher ? (user.checkedTeacher = req.body.checkedTeacher) : null;
      req.body.checkedClient ? (user.checkedClient = req.body.checkedClient) : null;
      req.body.checkedCountryManager ? (user.checkedCountryManager = req.body.checkedCountryManager) : null;
      req.body.checkedBoardMember ? (user.checkedBoardMember = req.body.checkedBoardMember) : null;


      user
        .save()
        .then(user => {
          res.status(202).json({ message: "User was updated successfully" });
        })
        .catch(err => {
          res
            .status(400)
            .json({
              message: "Something went wrong while trying to update this user"
            });
        });
    }
  });
});

module.exports = router;
