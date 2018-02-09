"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
  deadline: {
    type: String
  },
  posting: {
    type: String
  },
  style: {
    type: String
  },
  keywords: [
    {
      type: String
    }
  ],
  notes: {
    type: String
  },
  checkpoints: []
});

JobSchema.methods.jobRepresentation = function() {
  return {
    title: this.title,
    company: this.company,
    posting: this.posting,
    contact: this.contact,
    deadline: this.deadline,
    style: this.style,
    keywords: this.keywords,
    notes: this.notes,
    checkpoints: this.checkpoints,
    id: this._id
  };
};

const Job = mongoose.model("Job", JobSchema);

module.exports = { Job };
