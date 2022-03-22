const express = require('express');

const { getReposByUsername } = require('../helpers/github');
const db = require('../database');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  const { username } = req.body;

  if (!username) {
    res.status(404).end();
    return;
  }

  console.log(`Serving POST to /repos for username ${username}`);

  getReposByUsername(username)
    .then((repos) => db.save(username, repos))
    .then((repos) => res.status(201).send(repos))
    .catch((err) => {
      console.log('Something went wrong while serving POST to /repos');
      console.error(err);
    });
});

app.get('/repos', function (req, res) {
  db.getTopRepos().then((repos) => res.status(200).send(repos));
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
