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
    type: String,
    default: "https://image.flaticon.com/icons/png/512/744/744422.png"
  },
  contact: {
    type: String
  },
  deadline: {
    type: Date
  },
  style: {
    type: String
  },
  keywords: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    default: new Date()
  },
  notes: {
    type: String
  },
  checkpoints: [],
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

JobSchema.virtual("stage").get(function() {
  if (this.checkpoints.length === 0) {
    return 0;
  } else if (this.checkpoints.length > 0) {
    let lastCheckpoint = this.checkpoints.length - 1;
    let currentCheckpoint = this.checkpoints[lastCheckpoint];
    return currentCheckpoint.stage;
  }
});

JobSchema.virtual("completion").get(function() {
  let totalCheckpoints = 7;
  if (this.checkpoints.length === 0) {
    return 0 + "%";
  } else if (this.checkpoints.length > 0) {
    let lastCheckpoint = this.checkpoints.length - 1;
    let currentCheckpoint = this.checkpoints[lastCheckpoint];
    return (currentCheckpoint.stage / totalCheckpoints * 100).toFixed(0) + "%";
  }
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
    stage: this.stage,
    completion: this.completion,
    checkpoints: this.checkpoints,
    id: this._id
  };
};

const CheckpointSchema = mongoose.Schema({
  stage: {
    type: String,
    required: true
  },
  content: {
    type: String
  }
});

const Job = mongoose.model("Job", JobSchema);
const Checkpoint = mongoose.model("Checkpoint", CheckpointSchema);

module.exports = { Job, Checkpoint };
