import React from 'react';

const RepoListEntry = (props) => {
  const {
    username,
    reponame,
    owner,
    url,
    description,
    created,
    updated,
    pushed,
    stargazers,
    watchers,
    forks,
  } = props.repo;

  const divStyle = {
    maxWidth: '300px',
    margin: '10px',
    padding: '0 10px',
    backgroundColor: 'gainsboro',
    borderRadius: '5px',
  };

  const aStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  return (
    <div style={divStyle}>
      <h3>
        Repo: <a href={url} style={aStyle}>{reponame}</a>
      </h3>
      <p>
        <span>By {username}</span>
        <span>{username !== owner && ' Forked from ' + owner}</span>
      </p>
      <p>
        <em>{description}</em>
      </p>
      <p>Updated at {updated}</p>
      <p>
        <span>⭐ Stars: {stargazers} </span>
        <span>👀 Watchers: {watchers} </span>
        <span>🍴 Forks: {forks} </span>
      </p>
    </div>
  );
};

export default RepoListEntry;
