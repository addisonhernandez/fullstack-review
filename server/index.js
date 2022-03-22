const express = require('express');

const { getReposByUsername } = require('../helpers/github');
const db = require('../database');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  const { username } = req.body;
  console.log(`Serving POST to /repos for username ${username}`);

  getReposByUsername(username)
    .then((repos) => {
      res.status(201).send(repos);
      return repos;
    })
    .then((repos) => db.save(username, repos))
    .catch((err) => {
      console.log('Something went wrong in app.post');
      console.error(err);
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
