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
      success: (result) => {
        if (result && result.length) {
          this.setState({ repos: result });
        }
      },
      error: (err) => console.log('something went wrong during ajax'),
    });
  }

  render() {
    return (
      <>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
