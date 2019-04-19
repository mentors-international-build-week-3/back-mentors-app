const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateSignupInput(data) {

    let errors = {};

    // converts empty fields to an empty string so we can run validator
    data.email = !isEmpty(data.email) ? data.email : "";
    data.userFirstName = !isEmpty(data.userFirstName) ? data.userFirstName : "";
    data.userLastName = !isEmpty(data.userLastName) ? data.userLastName : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";


    // checks email field
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }  
    
    // checks userFirstName field
    if (Validator.isEmpty(data.userFirstName)) {
        errors.userFirstName = "First name field is required";
    }    

    // checks userLastName field
    if (Validator.isEmpty(data.userLastName)) {
        errors.userLastName = "Last name field is required";
    }  

    // checks password field
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }   

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 8, max: 50 })) {
        errors.password = "Password must be at least 8 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};