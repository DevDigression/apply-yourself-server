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
  posting: {
    type: String
  },
  image: {
    type: String
  },
  contact: {
    type: String
  },
  deadline: {
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
  notes: [
    {
      type: String
    }
  ],
  date: {
    type: String
  },
  stage: {
    type: String
  },
  completion: {
    type: String
  },
  checkpoints: []
});

JobSchema.methods.jobRepresentation = function() {
  return {
    title: this.title,
    company: this.company,
    posting: this.posting,
    image: this.image,
    contact: this.contact,
    deadline: this.deadline,
    style: this.style,
    keywords: this.keywords,
    notes: this.notes,
    date: this.date,
    completion: this.completion,
    checkpoints: this.checkpoints,
    id: this._id
  };
};

const Job = mongoose.model("Job", JobSchema);

module.exports = { Job };
