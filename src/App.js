import React from 'react';
import { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';


class App extends Component {
  state = {
    events: [],
    locations: []
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
        eventCount = this.state.numberOfEvents;
    } else(
        this.setState({ numberOfEvents: eventCount })
    )
    if (location === undefined) {
        location = this.state.locationSelected;
    }
    getEvents().then((events) => {
        let locationEvents = location === "Everywhere" ?
            events :
            events.filter((event) => event.location === location);
        this.setState({
            events: locationEvents.slice(0, eventCount),
            numberOfEvents: eventCount,
            locationSelected: location,
        });
    })
}
 

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents/>
      </div>
    );
  }
}

export default App;
