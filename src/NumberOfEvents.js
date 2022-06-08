import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventsNumber: 32,
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input 
          className="number-of-events"
          type="number"
          value={this.props.numberOfEvents}>
        </input>
      </div>
    );
  }
}

export default NumberOfEvents;