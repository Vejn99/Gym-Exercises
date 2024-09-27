const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define a static method called 'signup' on the userSchema
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Check if a user with the provided email already exists in the database
  const exists = await this.findOne({ email });

  // If the user already exists, throw an error with a message
  if (exists) {
    throw Error("Email already in use");
  }

  // Generate a salt for hashing the password (salt is used to make the hash more secure)
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the salt to ensure it's stored securely
  const hash = await bcrypt.hash(password, salt);

  // Create a new user in the database with the provided email and hashed password
  const user = await this.create({ email, password: hash });

  // Return the newly created user object
  return user;
};

module.exports = mongoose.model("User", userSchema);
