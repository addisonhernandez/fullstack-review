const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let repoSchema = mongoose.Schema({
  username: String,
  reponame: String,
  owner: String,
  url: String,
  description: String,
  created: Date,
  updated: Date,
  pushed: Date,
  stargazers: Number,
  watchers: Number,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

/**
 * Saves one or more repos to the database
 * @param {String} username
 * @param {Object[]} repoData
 */
let save = (username, repoData) => {
  const repos = repoData.map((repo) => {
    return {
      username: username,
      reponame: repo.name,
      url: repo.html_url,
      description: repo.description,
      created: repo.created_at,
      updated: repo.updated_at,
      pushed: repo.pushed_at,
      stargazers: repo.stargazers_count,
      watchers: repo.watchers_count,
      forks: repo.forks,
    };
  });

  Repo.insertMany(repos, { upsert: true });
};

module.exports.save = save;
