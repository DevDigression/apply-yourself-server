"use strict";
const express = require("express");
const { Job, Checkpoint } = require("./models");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const passport = require("passport");
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/", jwtAuth, (req, res) => {
  Job.find({ user: req.user.id })
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

router.get("/:id", jwtAuth, (req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job.jobRepresentation()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/", jwtAuth, (req, res) => {
  const requiredFields = ["title", "company"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  let job = {
    user: req.user.id,
    title: req.body.title,
    company: req.body.company,
    posting: req.body.posting,
    image: req.body.image,
    contact: req.body.contact,
    deadline: req.body.deadline,
    style: req.body.style,
    keywords: req.body.keywords,
    notes: req.body.notes,
    date: req.body.date,
    stage: req.body.stage,
    completion: req.body.completion,
    checkpoints: req.body.checkpoints
  };

  if (!job.image) {
    job.image = "https://image.flaticon.com/icons/png/512/744/744422.png";
  }
  Job.create(job)
    .then(job => res.status(201).json(job.jobRepresentation()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.put("/edit/:id", jwtAuth, (req, res) => {
  // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //   res.status(400).json({
  //     error: "Request path id and request body id values must match"
  //   });
  // }

  const updated = {};
  const updateableFields = [
    "title",
    "company",
    "posting",
    "contact",
    "deadline",
    "style",
    "keywords",
    "image"
  ];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Job.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedjob => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.delete("/:id", jwtAuth, (req, res) => {
  Job.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.post("/:id/checkpoint", jwtAuth, (req, res) => {
  const requiredFields = ["stage", "content"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  let checkpoint = {
    stage: req.body.stage,
    content: req.body.content
  };

  Job.findById(req.params.id)
    .then(job => {
      job.checkpoints.push(checkpoint);
      job.checkpoints.sort((a, b) => a.stage > b.stage);
      job.stage = checkpoint.stage;
      return job.save();
    })
    .then(job => {
      console.log(job);
      res.status(201).json(job.jobRepresentation());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error in request" });
    });
});

router.delete("/:id/checkpoint", jwtAuth, (req, res) => {
  Job.findById(req.body.job)
    .then(job => {
      let index = req.body.checkpoint;
      if (index > -1) {
        job.checkpoints.splice(index, 1);
      }
      return job.save();
    })
    .then(job => {
      res.status(201).json(job.jobRepresentation());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error in request" });
    });
});

router.post("/:id/notes", jwtAuth, (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      console.log(req.body.notes);
      // if (job.notes !== "") {
        job.notes = req.body.notes;
      // }
      return job.save();
    })
    .then(job => {
      console.log(job.notes);
      res.status(201).json(job.notes);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error in request" });
    });
});

module.exports = { router };
