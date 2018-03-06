"use strict";

const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const should = chai.should();
const { User } = require("../users");
const { Job } = require("../jobs/models");

const { closeServer, runServer, app } = require("../server");
const { TEST_DATABASE_URL, JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const username = "exampleUser";
const password = "example123123Pass";
let user_id;
let token;

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedJobsData() {
  console.info("seeding job data");
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      title: faker.lorem.sentence(),
      company: faker.lorem.text(),
      keywords: "React,Node,Javascript",
      user: user_id,
      style: faker.lorem.text()
    });
  }

  return Job.insertMany(seedData);
}

describe("Apply Yourself Jobs API resource", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return User.hashPassword(password)
      .then(password =>
        User.create({
          username,
          password
        })
      )
      .then(user => (user_id = user.id))
      .then(user => seedJobsData())
      .then(() => {
        token = jwt.sign(
          {
            user: {
              username,
              id: user_id
            }
          },
          JWT_SECRET,
          {
            algorithm: "HS256",
            subject: username,
            expiresIn: "7d"
          }
        );
      });
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    it("should return all existing jobs", function() {
      let res;
      return chai
        .request(app)
        .get("/api/jobs")
        .set("Authorization", `Bearer ${token}`)
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.jobs.should.have.length.of.at.least(1);
          return Job.count();
        })
        .then(count => {
          res.body.jobs.should.have.length(count);
        });
    });
  });
  it("should return jobs with right fields", function() {
    let resJob;
    return chai
      .request(app)
      .get("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.jobs.should.be.a("array");
        res.body.jobs.should.have.length.of.at.least(1);

        res.body.jobs.forEach(function(job) {
          job.should.be.a("object");
          job.should.include.keys("id", "title", "company");
        });
        resJob = res.body.jobs[0];
        return Job.findById(resJob.id);
      })
      .then(job => {
        resJob.title.should.equal(job.title);
        resJob.company.should.equal(job.company);
      });
  });

  describe("POST endpoint", function() {
    it("should add a new job", function() {
      const newJob = {
        title: faker.lorem.sentence(),
        company: faker.lorem.text(),
        style: faker.lorem.text(),
        keywords: "React,Node,Javascript"
      };

      return chai
        .request(app)
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(newJob)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.include.keys("id", "title", "company");
          res.body.title.should.equal(newJob.title);
          res.body.id.should.not.be.null;
          res.body.company.should.equal(newJob.company);
          return Job.findById(res.body.id);
        })
        .then(function(job) {
          job.title.should.equal(newJob.title);
          job.company.should.equal(newJob.company);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("should update fields", function() {
      const updateData = {
        title: "Web Developer",
        company: "Google",
        style: "Enterprise",
        keywords: "React,Node,Javascript"
      };

      return Job.findOne()
        .then(job => {
          updateData.id = job.id;

          return chai
            .request(app)
            .put(`/api/jobs/edit/${job.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return Job.findById(updateData.id);
        })
        .then(job => {
          job.title.should.equal(updateData.title);
          job.company.should.equal(updateData.company);
        });
    });
  });

  describe("DELETE endpoint", function() {
    it("should delete a job by id", function() {
      let job;

      return Job.findOne()
        .then(_job => {
          job = _job;
          return chai.request(app)
          .delete(`/api/jobs/${job.id}`).set("Authorization", `Bearer ${token}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Job.findById(job.id);
        })
        .then(_job => {
          should.not.exist(_job);
        });
    });
  });
});
