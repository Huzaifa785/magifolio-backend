const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  linkedin_url: {
    type: String,
    required: true,
  },
  // linkedin profile details
  username: {
    type: String,
  },
  profile_pic: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  headline: {
    type: String,
  },
  summary: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  education: {
    type: Array,
  },
  experience: {
    type: Array,
  },
  certifications: {
    type: Array,
  },
  phone: {
    type: String,
  },
  birthday: {
    type: String,
  },
  age: {
    type: String,
  },
  is_freelancer: {
    type: Boolean,
  },
  github: {
    type: String,
  },
  cover_image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = User = mongoose.model("users", UserSchema);
