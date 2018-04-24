import React, { Component } from 'react';
import About from './components/about';
import Performance from './components/performance';
import Results from './components/results'
import Photos from './components/photos'
import Calendar from './components/calendar'
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <About />
        <Performance />
        <Results />
        <Photos />
        <Calendar />
      </div>
    );
  }
}

export default App;
