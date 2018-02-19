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
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
  checkpoints: []
});

//TODO: Virtuals - stage, completion
JobSchema.virtual('stage').get(function() {
  return this.checkpoints.length;
});

JobSchema.virtual('completion').get(function() {
  return `80%`;
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
  job: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job'
  },
  stage: {
    type: String,
    required: true
  },
  content: {
    type: String,
  }
});

// CheckpointSchema.methods.checkpointRepresentation = function() {
//   return {
//     stage: this.stage,
//     content: this.content,
//     job: this.job,
//     id: this._id
//   };
// };

const Job = mongoose.model("Job", JobSchema);
const Checkpoint = mongoose.model("Checkpoint", CheckpointSchema);

module.exports = { Job, Checkpoint };