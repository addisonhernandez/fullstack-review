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
    return new Repo({
      username: username,
      reponame: repo.name,
      owner: repo.owner.login,
      url: repo.html_url,
      description: repo.description,
      created: repo.created_at,
      updated: repo.updated_at,
      pushed: repo.pushed_at,
      stargazers: repo.stargazers_count,
      watchers: repo.watchers_count,
      forks: repo.forks,
    });
  });

  // TODO: fix this. I should not have to drop documents every time
  return Repo.deleteMany({ username })
    .then((result) =>
      console.log(`deleted ${result.deletedCount} records from ${username}`)
    )
    .then(() => Repo.insertMany(repos))
    .then((result) => {
      console.log(`wrote ${result.length} records to ${username}`);
      return result;
    })
    .then(() => getTopRepos());
};

const getTopRepos = (username, limit = 25) => {
  const query = username ? { username } : {};

  return Repo.find(query)
    .sort({
      stargazers: 'desc',
      watchers: 'desc',
      forks: 'desc',
    })
    .limit(limit);
};

module.exports = {
  save,
  getTopRepos,
};
