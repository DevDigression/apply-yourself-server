"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// var jwt = require('jsonwebtoken');
// var secret = require('../config').secret;

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  income: {
    type: Number,
    default: 0
  },
  budget: {
    type: Number,
    default: 0
  }
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || ""
    // income: this.income || 0,
    // budget: this.budget || 0
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

// const UserBudgetSchema = mongoose.Schema({
//   income: {
//     type: Number,
//     required: true,
//     unique: true
//   },
//   budget: {
//     type: Number,
//     required: true
//   },
// });

// UserBudgetSchema.methods.serialize = function() {
//   return {
//     income: this.income || "",
//     budget: this.budget || ""
//   };
// };

const User = mongoose.model("User", UserSchema);

module.exports = { User };
