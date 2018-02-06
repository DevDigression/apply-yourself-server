"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const JobSchema = mongoose.Schema({
  title:
  company:
  contact-info
  deadline
  checkpoints: []
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  // firstName: { type: String, default: "" },
  // lastName: { type: String, default: "" }
});

JobSchema.methods.serialize = function() {
  return {
    // title: this.title || ""
  };
};


const Job = mongoose.model("Job", JobSchema);

module.exports = { Job };
