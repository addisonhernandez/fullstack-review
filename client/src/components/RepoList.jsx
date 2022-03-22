import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => {
  const entryDivStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  };

  return (
  <div>
    <h2> Repo List </h2>
    Here are the top {props.repos.length} repos.
    <div style={entryDivStyle}>
      {props.repos.map((repo) => (
        <RepoListEntry repo={repo} key={repo._id} />
      ))}
    </div>
  </div>
)};

export default RepoList;
