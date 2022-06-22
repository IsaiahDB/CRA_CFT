import React, { Component } from 'react';
import { ErrorAlert } from '../Alert';

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfEvents: 32
    };
}

  inputChanged = (event) => {
    const value = event.target.value;
    if (value < 0 || value > 32) {
      this.setState({
        numberOfEvents: '',
        errorText: 'Number should be no larger than 32 no lower than 1. No Negative numbers'
      });
    } else {
      this.setState({
        numberOfEvents: value
      });
    }
    this.props.updateNumberOfEvents(value);
  };
  

  render() {
    return (
      <div className="numberOfEvents">
        <ErrorAlert id='errorAlert' text={this.state.errorText} />
        <input 
          type="number"
          calssname="numberChange"
          onChange={this.inputChanged}
          value={this.state.numberOfEvents}>
        </input>
      </div>
    );
  }
}

export default NumberOfEvents;