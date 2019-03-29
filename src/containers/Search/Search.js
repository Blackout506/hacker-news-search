import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import './Search.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import ResultView from '../../components/ResultView/ResultView';

class Search extends Component {
  state = {
    query: '',
    results: [],
    searchBy: 'story'
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({
        query: event.target.value
      }, () => this.runSearch());
    }
  }

  changeSearchBy = (event) => {
    this.setState({
      searchBy: event.target.value
    }, () => this.runSearch());
  }

  runSearch = () => {
    if (this.state.query && this.state.query.length > 0) {
      this.props.onGetResults(this.state.query, this.state.searchBy);
    }
  }

  render() {

    let searchForm = (
      <div className='SearchForm'>
        <form>
          <input
            placeholder='Search for news...'
            onKeyPress={this.handleKeyPress} />
        </form>
        <form id='filter'>
          <label>Search By: </label>
          <label>
            Stories
            <input type='radio' value='story' checked={this.state.searchBy === 'story'} onChange={this.changeSearchBy}/>
          </label>
          <label>
            Comments
            <input type='radio' value='comment' checked={this.state.searchBy === 'comment'} onChange={this.changeSearchBy}/>
          </label>
        </form>
      </div>
    );

    let resultsArea = this.props.loading ? <Spinner /> :
      this.props.results.map((result) => {
        return (
          <li key={Math.random()}>
            <ResultView content={this.state.searchBy} title={result.title} author={result.author} points={result.points} comment={result.comment}/>
          </li>
        );
      });

    return (
      <div className='Search'>
        {searchForm}
        <h3>Results:</h3>
        <ul>
          {resultsArea}
        </ul>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    results: state.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetResults: (query, searchBy) => dispatch(actions.getResults(query, searchBy))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
