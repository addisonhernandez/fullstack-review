import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
    };
  }

  search(term) {
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: { username: term },
      success: (repos) => {
        if (repos && repos.length) {
          this.setState({ repos });
        }
      },
      error: (err) => {
        console.log('Error during POST request to /repos');
        console.error(err);
      },
    });
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: (repos) => {
        if (repos && repos.length) {
          this.setState({ repos });
        }
      },
      error: (err) => {
        console.log('Error during GET request to /repos');
        console.error(err);
      }
    });
  }

  render() {
    return (
      <>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)} />
        <RepoList repos={this.state.repos} />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
