import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  inputChanged = (event) => {
    const value = event.target.value;
    if (value < 0 || value > 32) {
      this.setState({
        numberOfEvents: '',
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