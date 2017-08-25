import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
// import courseObjects from './courseobjects';
import './search.css';

const getSuggestions = (value, filteredCourses) => {
  const input = value.toLowerCase();
  const inputLength = input.length;

  return inputLength === 0 ? [] : filteredCourses.filter(course =>
    course.title.toLowerCase().slice(0, inputLength) === input ||
    course.crn.slice(0, inputLength) === input
  );
};

const getSuggestionValue = suggestion => {
  return suggestion.title;
}

const renderSuggestion = suggestion => (
  <div>
    {suggestion.title}
    <br />
    {suggestion.professors}
  </div>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
    };
    this.onSuggestionsFetchRequested=this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionSelected=this.onSuggestionSelected.bind(this);
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.filteredCourses),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      value: '',
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.handleSelection(suggestion);
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a course title or name',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    );
  }
}

export default Search;
