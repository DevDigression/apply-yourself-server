# Apply Yourself

## Thinkful React/Fullstack Capstone Project

[Try out Apply Yourself!](https://apply-yourself.netlify.com/ "Apply Yourself")

![alt text](https://github.com/DevDigression/apply-yourself-client/blob/master/src/img/Apply%20Yourself%20Intro.jpg "Apply Yourself - Organize your application process and focus on landing the coding job you've been looking for!")

**Apply Yourself** is designed to give users a more productive job search by allowing them to organize their application materials and monitor their progress for each job. They can also analyze statistics about their overall job progression in order to focus on weak points and improve.

By logging into **Apply Yourself**, users have access to their *dashboard*:

![alt text](https://github.com/DevDigression/apply-yourself-client/blob/master/src/img/Apply%20Yourself%20Dashboard.gif "Apply Yourself Dashboard")

The *dashboard* lists all current job prospects that the user has collected. By clicking the *Add Job* button and filling out the form, a new job is added to the list. Each job section displays the job title and company, as well as the date added and an optional company logo. Additionally, the user assigns each job a priority level. As a user completes steps in the job application process, checkpoints are added to that job and the stage is updated accordingly. Jobs can be sorted on the dashboard by stage or by priority by clicking the respective buttons at the top of the dashboard. 

By clicking on a job from the *dashboard*, users are directed to the specific information pertaining to that job:

![alt text](https://github.com/DevDigression/apply-yourself-client/blob/master/src/img/Apply%20Yourself%20Single%20Job.gif "Apply Yourself Single Job")

Each job page gives the user several important elements related to their job:
 - Job title and company
 - Link to specific job posting
 - Progression bar displaying current stage of the job
 - Style of company (Enterprise, Startup, Nonprofit, Contract)
 - Desired skills for the job (eg., Javascript, React, Node)
 - Notes pertaining to the job
 - Checkpoints passed in the job application process (eg., sending resume, having interview, receiving coding challenge) as well as a button to add new checkpoints
 - Buttons to edit job information or remove the job from the list 

For perspective on how the job search is going as a whole, users can view their *Stats* page:

![alt text](https://github.com/DevDigression/apply-yourself-client/blob/master/src/img/Apply%20Yourself%20Stats.gif "Apply Yourself Stats")

Stats are displayed based on all current jobs on the user's list:
 - Average Job Progression: displaying how far on average a user has gone in the job search
 - Desired Skills: ranking of which skills appear most often so users can focus on developing the these skills to land a job 
 - Job Stages: the number of jobs the user has at each stage of the process to determine what stage is most often a hindrance in the job search
 - Job Styles: displaying how each style of job stacks up in terms of sheer numbers as well as a scatterplot to determine if the jobs with the highest priorities are being given their due and are furthest along in the job progression

## Technologies

Frontend: **React** + **Redux**, **NVD3**, **HTML5** + **CSS3** + **Javascript**

Server: **Node** with **Express**

Database: **MongoDB** 

Testing: **Enzyme** frontend and **Mocha** with **Chai** for API routes

Continuous integration: **Travis CI**  

Deployment: **Netlify** frontend and **Heroku** server