const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.linkedin_url = !isEmpty(data.linkedin_url) ? data.linkedin_url : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : "";
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Linkedin checks
  if (Validator.isEmpty(data.linkedin_url)) {
    errors.linkedin_url = "Linkedin URL is required";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.cpassword)) {
    errors.cpassword = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.cpassword)) {
    errors.cpassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
