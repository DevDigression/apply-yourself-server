"use strict";
const express = require("express");
const { Job } = require("./models");
const router = express.Router();

router.get("/", (req, res) => {
  Job.find()
    .then(jobs => {
      res.json({
        jobs: jobs.map(job => job.jobRepresentation())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.get("/:id", (req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job.jobRepresentation()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);

  const requiredFields = ["title", "company"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Job.create({
    title: req.body.title,
    company: req.body.company,
    posting: req.body.posting,
    image: req.body.image,
    contact: req.body.contact,
    deadline: req.body.deadline,
    style: req.body.style,
    keywords: req.body.keywords,
    notes: req.body.notes,
    checkpoints: req.body.checkpoints,
    id: req.body._id
  })
    .then(job => res.status(201).json(job.jobRepresentation()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.delete("/:id", (req, res) => {
  Job.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.put("/edit/:id", (req, res) => {
  // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //   res.status(400).json({
  //     error: "Request path id and request body id values must match"
  //   });
  // }

  const updated = {};
  const updateableFields = ["title", "company", "contact", "deadline"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Job.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedjob => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

module.exports = { router };
