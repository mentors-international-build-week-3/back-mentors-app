# back-mentors-app

## Resources

Mentors International Official Website: https://mentorsinternational.org/

The Heroku-hosted Full-Stack MERN (MongoDB, Express, React.js, Node.js) App can be found here: https://pacific-dusk-14025.herokuapp.com/

Please see the Technical Design Document (TDD) for this app here: https://docs.google.com/document/d/1Q53l-OgrgqaLK2wImpiiMsl9Vaoks75-GAMpNJUQbaI/edit?usp=sharing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction

This is the GitHub repository for the back end portion of the Mentors International Training Reminders project
for Lambda School's Build Week April 15 -19.

On April 12, 2019 at ~6:30PM, I was placed on this project to demonstrate mastery of database management and testing for a full-stack app utilizing a SQL database. Therefore, I was to fill the role of the "Back-End Developer".

By the end of day on April 12, things were beginning to look bleak as other projects were filling up, but 'Mentors International Training Reminders' had YET to secure the following roles for its project:

- (1) User Experience Designer

  - Responsible for coming up with the design and layout of how the web app should look from the user's standpoint.
  - Provide: style guide, design systems, and wireframes to reach a MVP (minimum viable product).

- (1) User Interface Developer

  - Responsible for creating a visually-stunning and dynamic Landing/Marketing page,
  - Create a seconday static HTML page to describe the team members working on the app.

- (2) Front-End Architects

  - Responsibile for building the web app's user-facing infrastructure using React.js.
  - Must be able to pull data from the back-end database to be displayed on the front-end of the app.

- (1) SCRUM Master/Team Lead

  - Facilitate the coordination of individual roles to create a web app that meets MVP requirements in a 5-day period.
  - Helps to identify and resolve any blockers or bugs that hinder the group's progress towards MVP.

By the end of the day on April 12, 2019, I was the ONLY developer on the project. A lot of my classmates had already met with their teams and their SCRUM masters to develop database schemas, design plans, and file structures for a smooth start on the following Monday. Feeling discouraged and realizing that I would have to leave this project to join another one, only to fall behind, I still went ahead and did some research on the official website (https://mentorsinternational.org/) to get a better idea of the company's mission and goals. I came across this video (https://youtu.be/Qhwm0jNygY4) on their website that LIT A FIRE IN MY SOUL for their mission of ending poverty through education, mentorship, and entrepreneurship.

With approval from the powers-that-be (Ryan Hamblin, Web Development Program Manager at Lambda School, https://github.com/ryan-hamblin), I had the 'green light' to attempt to build this full-stack app as the only developer on the project with my program manager, Jake Thomas, as my Team Lead. I did not view our lack of personnel as a 'crutch' but moreso as a 'challenge' that could further my skills and demonstrate my ability to execute well with little to no accountability.

Curious to try the M.E.R.N. tech stack (MongoDB, Express, React.js Node.js) after a classmate told me about a project his friend had completed using it, I was determined to learn/build the entire app utilizing a new kind of database, NoSQL (MongoDB), which required a different way of making queries to the database than I was used to (SQL with PostgreSQL).

You might be extremely surprised at the amount of things you could learn in 5 days when your head AND your heart align!

Here are some things that I've learned in working this project:

- how to a NoSQL database to manage/manipulate data with CRUD (create, read, update, destroy) operations and an API.
- how to deploy a FULL-STACK MERN app to Heroku (which only hosts back-end apps or full stack apps; front end apps can be hosted on sites like netlify.com).
- how to utilize Twilio's Programmable SMS API to create a way for Mentors to send text messages to their clients from the app
- how to use the same aforementioned SMS API to create a RSVP chatbot to give mentors a headcount of who is planning to attend training for a specific day.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs both, the back-end server (http://localhost:5000) AND the client server (http://localhost:3000), in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the entire app in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run server`

Launches the back-end server in dev mode.<br>

### `heroku-postbuild`

Builds the app for production to be deployed to Heroku as a single full stack app.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment to Heroku

You can learn how to deploy a MERN app to Heroku here: https://coursework.vschool.io/deploying-mern-with-heroku/
