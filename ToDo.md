0. Setup mlab + .env + source .env (Don't use mongo on your computer)
1. Finish models
1. Do the routes.
1. Test CRUD with postman.

# Backend

* Finish the model with all the fields.
    * remember to clear db after modifying the model
* Add all those fields to the the api routes.
* Test postman.
* Do the tests for these routes. (Ex. MongooseBlogApp -> test branch)

### DevOps

* Deploy Server to heroku through travis.

### LATER ON

* functionality for checkpoint
    * Implement a route POST /job/q34536e456/add-checkpoint
    * That route .pushes into the checkpoints array, saves the job and responds with job+201
