const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {

    let errors = {};

    // converts empty fields to an empty string so we can run validator
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    // checks username field
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    // checks password field
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }   

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 10, max: 50 })) {
        errors.password = "Password must be at least 10 characters";
    }

    if (Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    // checks phoneNumber field
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Phone number field is required";
    } else if (!Validator.isMobilePhone(data.phoneNumber)) {
        errors.phoneNumber = "Phone number is invalid";
    }   

    // checks email field
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }    

    return {
        errors,
        isValid: isEmpty(errors)
    };
};