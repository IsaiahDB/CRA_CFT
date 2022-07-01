import React from 'react';
import { Component } from 'react';
import './App.css';
import CitySearch from './components/CitySearch/CitySearch.jsx';
import EventList from './components/EventList/EventList.jsx';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents.jsx';
import { getEvents, extractLocations, checkToken } from './api.js';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';
import './nprogress.css';
import { AlertUserOffline } from './components/Alert';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;

    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText:
        'Your are currently offline. The displayed events might not be up to date.'
      });
    } else {
      this.setState({
        offlineText: ''
      });
    }
  }



  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents,
    });

    this.updateEvents(this.state.locations, numberOfEvents);
  };

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
          numberOfEvents: eventCount,
        });
      }
    });
  };
 

getData = () => {
  const { locations, events } = this.state;
  const data = locations.map((location) => {
    const number = events.filter(
      (event) => event.location === location
    ).length;
    const city = location.split(", ").shift();
    return { city, number };
  });
  return data;
};
 

  render() {
    const { events, locations, numberOfEvents, offlineText } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <div className='graphSection'>
        <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20,}}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis allowDecimals={false} type="number" dataKey="number" name="number of events" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer> 
        <EventGenre events={events} />
        </div>
      <CitySearch
        locations={locations}
        updateEvents={this.updateEvents}
      />
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        updateNumberOfEvents={this.updateNumberOfEvents}
      />
      <EventList events={events} />
      
      <AlertUserOffline text={offlineText} />
      </div>
    )}
}

export default App;
