import React, { Component } from 'react';


class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      display: this.inline
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'blue';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'red';
    }
  }

  class AlertUserOffline extends Alert {
    constructor(props) {
      super(props);
      this.color = 'pink';
    }
  }


export { InfoAlert };
export { ErrorAlert };
export { AlertUserOffline };

