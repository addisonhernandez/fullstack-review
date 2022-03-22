const axios = require('axios');
require('dotenv').config();

let getReposByUsername = (username) => {
  return axios({
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      Authorization: process.env.GITHUB_TOKEN,
    },
  }).then((response) => response.data);
};

module.exports.getReposByUsername = getReposByUsername;
